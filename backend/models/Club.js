const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Club name is required'],
        unique: true,
        trim: true,
        maxlength: [100, 'Club name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Club description is required'],
        maxlength: [500, 'Description cannot exceed 500 characters']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: [
            'Technology', 'Arts & Literature', 'Business', 'Sports', 
            'Music', 'Photography', 'Social Service', 'Research', 
            'Cultural', 'Academic'
        ]
    },
    college: {
        type: String,
        required: [true, 'College affiliation is required']
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    moderators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    members: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        joinedAt: {
            type: Date,
            default: Date.now
        },
        role: {
            type: String,
            enum: ['member', 'moderator'],
            default: 'member'
        }
    }],
    pendingRequests: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        requestedAt: {
            type: Date,
            default: Date.now
        },
        message: String
    }],
    settings: {
        isPrivate: {
            type: Boolean,
            default: false
        },
        requireApproval: {
            type: Boolean,
            default: true
        },
        allowMemberInvites: {
            type: Boolean,
            default: true
        }
    },
    clubImage: String,
    tags: [String],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Virtual for member count
clubSchema.virtual('memberCount').get(function() {
    return this.members.length;
});

// Index for search optimization
clubSchema.index({ name: 'text', description: 'text', tags: 'text' });
clubSchema.index({ category: 1, college: 1 });

module.exports = mongoose.model('Club', clubSchema);