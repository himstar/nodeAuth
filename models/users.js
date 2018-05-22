const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
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
    userLevel: {
        type: Number
    },
    assignedReviews: [{
        type: String
    }]
});

const User = module.exports = mongoose.model('User', UserSchema);