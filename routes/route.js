const express = require('express');
const router = express.Router();

const User = require('../models/users');
const Company = require('../models/companies');

//User
router.get('/users', (req, res, next)=> {
    User.find((err, users)=>{
        res.json(users);
    });
});

router.post('/adduser', function (req, res, next) {

    var name= req.body.name;
    var email= req.body.email;
    var phone= req.body.phone;
    var password= req.body.password;
    var assignedCompanies= req.body.assignedCompanies;

    User.findOne({ email: email }, function (err, user) {
        if (err) console.log(err);

        if (user) {
            res.json("userExists");
        } else {
            var newUser = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                assignedCompanies: req.body.assignedCompanies
            });
            newUser.save((err, user)=>{
                if(err){
                    res.json(err);
                } else {
                    res.json('Contact added successfully');
                }
            });
        }
    });
});
router.delete('/user/:id', (req, res, next)=>{
    User.remove({_id: req.params.id}, (err, result)=>{
        if(err){
            res.json(err);
        } else {
            res.json('Contact deleted successfully');
        }
    });
});

router.post('/login', function (req, res) {

    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ email: email, password: password }, function (err, user) {
        if (err) console.log(err);

        if (user) {
            res.json('Login succesfull');
        } else {
            res.json("invalidLogin");
        }
    });
});

// user assigned company
router.post('/userassigncompany', function (req, res, next) {

    var UserId = req.body._id;    
    var assignedCompanies= req.body.assignedCompanies;

    User.findOne({ _id: UserId }, function (err, user) {
        if (err) console.log(err);
        user.assignedCompanies.push(assignedCompanies);
        user.save((err, user)=>{
            if(err){
                res.json(err);
            } else {
                res.json('User company assigned');
            }
        });
    });
});

//company

router.get('/companies', (req, res, next)=> {
    Company.find((err, companies)=>{
        res.json(companies);
    });
});

router.post('/addcompany', function (req, res, next) {

    var companyUrl= req.body.companyUrl;
    var rate= req.body.rate;
    var review= req.body.review;
    var UserId= req.body._id;
    
    Company.findOne({ companyUrl: companyUrl }, function (err, company) {
        if (err) console.log(err);

        if (company) {
            res.json("companyExists");
        } else {
            var newCompany = new Company({
                companyUrl: req.body.companyUrl,
                rate: req.body.rate,
                review: req.body.review,
                assignedUser: req.body._id
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
router.delete('/company/:id', (req, res, next)=>{
    Company.remove({_id: req.params.id}, (err, result)=>{
        if(err){
            res.json(err);
        } else {
            res.json('Company deleted successfully');
        }
    });
});
// review for existing company
router.post('/addcompanyreview', function (req, res, next) {

    var companyUrl= req.body.companyUrl;
    var rate= req.body.rate;
    var review= req.body.review;
    var assignedUser= req.body._id;

    Company.findOne({ companyUrl: companyUrl }, function (err, company) {
        if (err) console.log(err);
        company.rate.push(rate);
        company.review.push(review);
        company.assignedUser.push(assignedUser);
        company.save((err, company)=>{
            if(err){
                res.json(err);
            } else {
                res.json('Review added successfully');
            }
        });
    });
});


module.exports = router;