const express = require('express');
const { body, validationResult } = require('express-validator');
const Club = require('../models/Club');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all clubs with filtering and pagination
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 12, category, college, search } = req.query;
        const query = { isActive: true };

        if (category) query.category = category;
        if (college) query.college = college;
        if (search) {
            query.$text = { $search: search };
        }

        const clubs = await Club.find(query)
            .populate('admin', 'fullName college')
            .populate('members.user', 'fullName college')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const total = await Club.countDocuments(query);

        res.json({
            clubs,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            totalClubs: total
        });
    } catch (error) {
        console.error('Get clubs error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get club by ID
router.get('/:id', async (req, res) => {
    try {
        const club = await Club.findById(req.params.id)
            .populate('admin', 'fullName email college')
            .populate('members.user', 'fullName college profile.profilePicture')
            .populate('moderators', 'fullName college')
            .populate('events');

        if (!club) {
            return res.status(404).json({ message: 'Club not found' });
        }

        res.json({ club });
    } catch (error) {
        console.error('Get club error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new club
router.post('/', auth, [
    body('name').trim().isLength({ min: 3, max: 100 }).withMessage('Club name must be 3-100 characters'),
    body('description').trim().isLength({ min: 10, max: 500 }).withMessage('Description must be 10-500 characters'),
    body('category').notEmpty().withMessage('Category is required'),
    body('college').notEmpty().withMessage('College is required')
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, description, category, college, tags, isPrivate } = req.body;

        // Check if club name already exists
        const existingClub = await Club.findOne({ name: new RegExp(`^${name}$`, 'i') });
        if (existingClub) {
            return res.status(400).json({ message: 'A club with this name already exists' });
        }

        const club = new Club({
            name,
            description,
            category,
            college,
            admin: req.user.userId,
            tags: tags || [],
            'settings.isPrivate': isPrivate || false,
            members: [{
                user: req.user.userId,
                role: 'member'
            }]
        });

        await club.save();

        // Add club to user's adminClubs
        await User.findByIdAndUpdate(req.user.userId, {
            $push: { adminClubs: club._id, joinedClubs: club._id }
        });

        const populatedClub = await Club.findById(club._id)
            .populate('admin', 'fullName college')
            .populate('members.user', 'fullName college');

        res.status(201).json({ club: populatedClub });
    } catch (error) {
        console.error('Create club error:', error);
        res.status(500).json({ message: 'Server error creating club' });
    }
});

// Join club
router.post('/:id/join', auth, async (req, res) => {
    try {
        const club = await Club.findById(req.params.id);
        if (!club) {
            return res.status(404).json({ message: 'Club not found' });
        }

        // Check if already a member
        const isMember = club.members.some(member => 
            member.user.toString() === req.user.userId
        );
        if (isMember) {
            return res.status(400).json({ message: 'Already a member of this club' });
        }

        if (club.settings.requireApproval) {
            // Add to pending requests
            const alreadyRequested = club.pendingRequests.some(request => 
                request.user.toString() === req.user.userId
            );

            if (alreadyRequested) {
                return res.status(400).json({ message: 'Join request already pending' });
            }

            club.pendingRequests.push({
                user: req.user.userId,
                message: req.body.message
            });

            await club.save();
            res.json({ message: 'Join request sent successfully' });
        } else {
            // Direct join
            club.members.push({
                user: req.user.userId
            });

            await club.save();
            await User.findByIdAndUpdate(req.user.userId, {
                $push: { joinedClubs: club._id }
            });

            res.json({ message: 'Successfully joined the club' });
        }
    } catch (error) {
        console.error('Join club error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;