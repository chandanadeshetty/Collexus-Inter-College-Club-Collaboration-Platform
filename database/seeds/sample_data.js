const User = require('../../backend/models/User');
const Club = require('../../backend/models/Club');
const Event = require('../../backend/models/Event');

const sampleUsers = [
    {
        fullName: 'Rahul Sharma',
        email: 'rahul@iitd.ac.in',
        password: 'password123',
        college: 'IIT Delhi',
        profile: {
            bio: 'Computer Science student interested in AI/ML',
            skills: ['Python', 'JavaScript', 'Machine Learning'],
            interests: ['Technology', 'Research']
        },
        isEmailVerified: true
    },
    {
        fullName: 'Priya Patel',
        email: 'priya@nitt.edu',
        password: 'password123',
        college: 'NIT Trichy',
        profile: {
            bio: 'Passionate about debate and literature',
            skills: ['Public Speaking', 'Writing', 'Research'],
            interests: ['Arts & Literature', 'Social Service']
        },
        isEmailVerified: true
    }
];

const sampleClubs = [
    {
        name: 'AI & Machine Learning Society',
        description: 'Exploring the frontiers of artificial intelligence and machine learning',
        category: 'Technology',
        college: 'IIT Delhi',
        tags: ['AI', 'ML', 'Python', 'Research']
    },
    {
        name: 'Debate & Literary Club',
        description: 'Enhancing communication and critical thinking skills',
        category: 'Arts & Literature',
        college: 'NIT Trichy',
        tags: ['Debate', 'Literature', 'Writing', 'Speaking']
    }
];

async function seedDatabase() {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Club.deleteMany({});
        await Event.deleteMany({});

        // Create sample users
        const users = await User.create(sampleUsers);
        console.log(`Created ${users.length} sample users`);

        // Create sample clubs
        const clubs = await Promise.all(
            sampleClubs.map(async (clubData, index) => {
                const club = new Club({
                    ...clubData,
                    admin: users[index]._id,
                    members: [{ user: users[index]._id }]
                });
                return await club.save();
            })
        );
        console.log(`Created ${clubs.length} sample clubs`);

        // Update users with club memberships
        await User.findByIdAndUpdate(users[0]._id, {
            $push: { adminClubs: clubs[0]._id, joinedClubs: clubs[0]._id }
        });
        await User.findByIdAndUpdate(users[1]._id, {
            $push: { adminClubs: clubs[1]._id, joinedClubs: clubs[1]._id }
        });

        console.log('Sample data seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

module.exports = { seedDatabase };