const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    companyUrl: {
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    }
});

const Company = module.exports = mongoose.model('Company', CompanySchema);