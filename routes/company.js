const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
router.get('/url/:webUrl', (req, res, next)=>{
    Company.find({webUrl: req.params.webUrl}, (err, result)=>{
        if(err){
            res.json(err);
        } else {
            res.json(result);
        }
    });
});
router.post('/login', function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    Company.findOne({email: email})
    .exec()
    .then(function(company) {
       bcrypt.compare(password, company.password, function(err, result){
          if(err) {
             return res.json({
                message: 'Unauthorized Access'
             });
          }
          if(result) {
             const jwtToken = jwt.sign({
                email: company.email,
                companyName: company.companyName,
                activePlan: company.activePlan,
                _id: company._id
              },
              'secret',
               {
                 expiresIn: '2h'
               });
               return res.json({
                    message: 'success',
                    token: jwtToken
               });             
          }
          return res.json({
                message: 'Unauthorized Access'
          });
       });
    })
    .catch(error => {
       res.json({
        message: 'error'
       });
    });;
});
router.post('/register', function(req, res) {
    var personName= req.body.personName;
    var companyName= req.body.companyName;
    var webUrl = req.body.webUrl;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;  
    var activePlan = 0;  
    bcrypt.hash(password, 10, function(err, hash){
       if(err) {
          return res.json({
             error: err
          });
       }
       else {
            var newCompany = new Company({
                personName: personName,
                companyName: companyName,
                webUrl: webUrl,
                email: email,
                phone: phone,
                activePlan: activePlan,
                password: hash
            });
            newCompany.save((err, result)=>{
                if(err) {
                    return res.json({
                        message: 'alreadyRegistered'
                    });
                 }
                 if(result) {
                    return res.json({
                       message: 'success'
                    });
                 }
                 return res.json({
                        message: 'error'
                 });
            });
       }
    });
});
router.post('/addAdmin', (req, res, next)=> {
    var companyUrl= req.body.companyUrl;
    var companyName= req.body.companyName;
    var companyEmail= req.body.companyEmail;
    var companyPassword= req.body.companyPassword;
    var companyPhone = req.body.companyPhone;
    var assignedReviews= req.body.reviewId;
    Company.findOne({ companyUrl: companyUrl }, (err, company) => {
        if (err) console.log(err);
        if (company) {
            res.json("companyExists");
        } else {
            var newCompany = new Company({
                companyUrl: companyUrl,
                companyName: companyName,
                companyEmail: companyEmail,
                companyPassword: companyPassword,
                companyPhone: companyPhone,
                assignedReviews: assignedReviews
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
router.post('/profile/update', function (req, res) {
    var phone = req.body.phone;
    var country = req.body.country;
    var webUrl = req.body.webUrl;
    var personName = req.body.personName;
    var companyName = req.body.companyName;
    var facebook = req.body.facebook;
    var twitter = req.body.twitter;
    var googlePlus = req.body.googlePlus;
    var linkedin = req.body.linkedin;
    var description = req.body.description;                
    var companyId = req.body.companyId;
    var password = req.body.password;
    var category = req.body.category;
    Company.findOne({ _id: companyId })
        .exec()
        .then(function (company) {
            bcrypt.compare(password, company.password, function (err, success) {
                if (success) {
                    company.phone = phone;
                    company.companyName = companyName;
                    company.country = country;
                    company.personName = personName;
                    company.webUrl = webUrl;
                    company.facebook = facebook;
                    company.googlePlus = googlePlus;
                    company.twitter = twitter;
                    company.linkedin = linkedin;
                    company.description = description;
                    company.category = category;
                    company.save((err, company) => {
                        if (err) {
                            return res.json({
                                message: err
                            });
                        } else {
                            return res.json({
                                message: 'success'
                            });
                        }
                    });
                } else {
                    return res.json({
                        message: 'invalid password'
                    });
                }
            });
        })
        .catch(error => {
            res.json({
                message: 'error'
            });
        });;
});
router.post('/profile/image/update', (req, res, next) => {
    var companyId = req.body.companyId;
    var logo = req.body.logo;
    Company.findOne({ _id: companyId }, (err, company) => {
        if (err) {
            res.json({
                message: 'error'
            });
        } else if (!company) {
            res.json({
                message: 'invalid company'
            });
        } else {
            company.logo = logo;
            company.save((err, company) => {
                if (err) {
                    res.json({
                        message: 'error'
                    });
                } else {
                    res.json({
                        message: 'success'
                    });
                }
            });
        }
    });
});
router.post('/profile/review/add', (req, res, next) => {
    var companyId = req.body.companyId;
    var reviewId = req.body.reviewId;
    Company.findOne({ _id: companyId }, (err, company) => {
        if (err) {
            res.json({
                message: 'error'
            });
        } else if (!company) {
            res.json({
                message: 'invalid company'
            });
        } else {
            company.assignedReviews = reviewId;
            company.save((err, company) => {
                if (err) {
                    res.json({
                        message: 'error'
                    });
                } else {
                    res.json({
                        message: 'success'
                    });
                }
            });
        }
    });
});
router.post('/profile/adminUpdate', (req, res, next)=>{
    var companyId = req.body.companyId;
    var phone= req.body.companyPhone;
    var email= req.body.companyEmail;
    var url= req.body.companyUrl;
    var name= req.body.companyName;
    Company.findOne({_id: companyId}, (err, company)=>{
        if (err) {
            console.log(err);
        } else if(!company){
            res.json('Company not exist');
        } else {
            company.companyPhone = phone;
            company.companyUrl = url;
            company.companyEmail = email;
            company.companyName = name;
            company.save((err, company)=>{
                if(err){
                    res.json(err);
                } else {
                    res.json('Company updated');
                }
            });
        }
    });
});
router.get("/", function(req, res){
    var noMatch = null;
    if(req.query.search) {
        const searhQuery = new RegExp(escapeSearch(req.query.search), 'gi');
        
        // Get all campgrounds from DB
        Company.find({companyName: req.query.search}, function(err, allcompanies){
            console.log(allcompanies);
           if(err){
               console.log(err);
           } else {
              if(Company.length < 1) {
                  noMatch = "No company match that query, please try again.";
              }
              res.json({
                Company: allcompanies,
                noMatch: noMatch
            });
           }
        });
    } else {
        // Get all campgrounds from DB
        Company.find({}, function(err, allcompanies){
           if(err){
               console.log(err);
           } else {
            res.json({
                Company: allcompanies,
                noMatch: noMatch
            });
           }
        });
    }
});
function escapeSearch(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
module.exports = router;