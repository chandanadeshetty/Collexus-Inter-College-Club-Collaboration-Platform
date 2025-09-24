const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Event title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Event description is required'],
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    date: {
        type: Date,
        required: [true, 'Event date is required'],
        validate: {
            validator: function(value) {
                return value > new Date();
            },
            message: 'Event date must be in the future'
        }
    },
    time: {
        type: String,
        required: [true, 'Event time is required']
    },
    venue: {
        type: String,
        required: [true, 'Event venue is required']
    },
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: true
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    attendees: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        registeredAt: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['registered', 'attended', 'cancelled'],
            default: 'registered'
        }
    }],
    maxAttendees: {
        type: Number,
        default: null
    },
    eventImage: String,
    tags: [String],
    isPublic: {
        type: Boolean,
        default: true
    },
    registrationDeadline: Date,
    eventType: {
        type: String,
        enum: ['workshop', 'seminar', 'competition', 'social', 'meeting', 'conference'],
        required: true
    },
    requirements: [String],
    rewards: [String],
    contact: {
        email: String,
        phone: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Virtual for attendee count
eventSchema.virtual('attendeeCount').get(function() {
    return this.attendees.length;
});

// Index for search optimization
eventSchema.index({ title: 'text', description: 'text', tags: 'text' });
eventSchema.index({ date: 1, club: 1 });

module.exports = mongoose.model('Event', eventSchema);