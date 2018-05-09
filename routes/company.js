const express = require('express');
const router = express.Router();

const Company = require('../models/companies');

router.get('/all', (req, res, next)=> {
    Company.find((err, companies)=>{
        res.json(companies);
    });
});
router.get('/:id', (req, res, next)=>{
    Company.find({_id: req.params.id}, (err, result)=>{
        if(err){
            res.json(err);
        } else {
            res.json(result);
        }
    });
});
router.post('/add', (req, res, next)=> {
    var companyUrl= req.body.companyUrl;
    var companyName= req.body.companyName;
    var assignedReviews= req.body.reviewId;
    Company.findOne({ companyUrl: companyUrl }, (err, company) => {
        if (err) console.log(err);
        if (company) {
            res.json("companyExists");
        } else {
            var newCompany = new Company({
                companyUrl: req.body.companyUrl,
                companyName: req.body.companyName,
                assignedReviews: req.body.reviewId
            });
            newCompany.save((err, company)=>{
                if(err){
                    res.json(err);
                } else {
                    res.json('Company added successfully');
                }
            });
        }
    });
});
router.delete('/:id', (req, res, next)=>{
    Company.remove({_id: req.params.id}, (err, result)=>{
        if(err){
            res.json(err);
        } else {
            res.json('Company deleted successfully');
        }
    });
});


module.exports = router;