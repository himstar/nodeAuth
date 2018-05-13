const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    companyUrl: {
        type: String,
        required: true
    },
    companyName: [{
        type: String,
        required: true
    }],
    companyEmail: {
        type: String
    },
    companyPhone: {
        type: Number
    },
    companyPassword: {
        type: String
    },
    assignedReviews: [{
        type: String
    }]    
});

const Company = module.exports = mongoose.model('Company', CompanySchema);