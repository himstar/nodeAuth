const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
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
    token: {
        type: String,
        required: true
    }
});

const Admin = module.exports = mongoose.model('Admin', AdminSchema);