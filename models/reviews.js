const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
    rate: {
        type: Number,
        required: true
    },
    review: [{
        type: String,
        required: true
    }],
    assignedUser: {
        type: String,
        required: true
    },
    assignedCompany: {
        type: String,
        required: true
    }        
});

const Review = module.exports = mongoose.model('Review', ReviewSchema);