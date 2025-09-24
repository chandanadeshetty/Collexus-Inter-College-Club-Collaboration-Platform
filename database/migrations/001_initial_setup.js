const mongoose = require('mongoose');

async function up() {
    // Create indexes for better performance
    const User = require('../../backend/models/User');
    const Club = require('../../backend/models/Club');
    const Event = require('../../backend/models/Event');

    // User indexes
    await User.collection.createIndex({ email: 1 }, { unique: true });
    await User.collection.createIndex({ college: 1 });

    // Club indexes
    await Club.collection.createIndex({ name: 'text', description: 'text' });
    await Club.collection.createIndex({ category: 1, college: 1 });

    // Event indexes
    await Event.collection.createIndex({ date: 1 });
    await Event.collection.createIndex({ club: 1, date: 1 });

    console.log('Database indexes created successfully');
}

async function down() {
    // Drop indexes if needed during rollback
    console.log('Rolling back database setup');
}

module.exports = { up, down };