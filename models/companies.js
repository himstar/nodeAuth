const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    webUrl: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    personName: {
        type: String,
        required: true
    },    
    email: {
        type: String,
        unique: true,
        required: true        
    },
    phone: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    activePlan: {
        type: Number
    },
    assignedReviews: [{
        type: String
    }]    
});

const Company = module.exports = mongoose.model('Company', CompanySchema);