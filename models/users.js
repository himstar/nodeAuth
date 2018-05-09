const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number
    },
    gender: {
        type: String
    },
    country: {
        type: String
    },
    profile_image: {
        type: String
    },
    assignedReviews: [{
        type: String
    }]
});

const User = module.exports = mongoose.model('User', UserSchema);