const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    webUrl: {
        type: String,
        required: true,
        unique: true
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
    country: {
        type: String
    },
    phone: {
        type: String
    },
    category: {
        type: String
    },
    facebook: {
        type: String
    }, 
    googlePlus: {
        type: String
    }, 
    twitter: {
        type: String
    }, 
    linkedin: {
        type: String
    },
    description: {
        type: String
    },                     
    password: {
        type: String,
        required: true
    },
    activePlan: {
        type: Number
    },
    logo: {
        type: String
    },
    assignedReviews: [{
        type: String
    }]    
});

const Company = module.exports = mongoose.model('Company', CompanySchema);