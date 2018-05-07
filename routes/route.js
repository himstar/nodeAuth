const express = require('express');
const router = express.Router();

const User = require('../models/users');
const Company = require('../models/companies');
const Review = require('../models/reviews');

//User
router.get('/users', (req, res, next)=> {
    User.find((err, users)=>{
        res.json(users);
    });
});

router.post('/adduser', (req, res, next)=>{

    var name= req.body.name;
    var email= req.body.email;
    var phone= req.body.phone;
    var password= req.body.password;
    var assignedReviews= req.body.reviewId;

    User.findOne({ email: email }, (err, user)=>{
        if (err) console.log(err);

        if (user) {
            res.json("userExists");
        } else {
            var newUser = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password,
                assignedReviews: req.body.reviewId
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

router.post('/login', (req, res)=>{

    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ email: email, password: password }, (err, user)=> {
        if (err) console.log(err);

        if (user) {
            res.json('Login succesfull');
        } else {
            res.json("invalidLogin");
        }
    });
});

//company

router.get('/companies', (req, res, next)=> {
    Company.find((err, companies)=>{
        res.json(companies);
    });
});

router.post('/addcompany', (req, res, next)=> {

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
router.delete('/company/:id', (req, res, next)=>{
    Company.remove({_id: req.params.id}, (err, result)=>{
        if(err){
            res.json(err);
        } else {
            res.json('Company deleted successfully');
        }
    });
});
// reviews
router.get('/reviews', (req, res, next)=> {
    Review.find((err, reviews)=>{
        res.json(reviews);
    });
});


router.post('/addreview', (req, res, next)=> {
    var rate= req.body.rate;
    var review= req.body.review;
    var assignedUser= req.body.UserId;
    var assignedCompany= req.body.CompanyId;

    var newReview = new Review({
        rate: req.body.rate,
        review: req.body.review,
        assignedUser: req.body.UserId,
        assignedCompany: req.body.CompanyId
    });
    newReview.save((err, review)=>{
        if(err){
            res.json(err);
        } else {
            res.json('Review added successfully');
        }
    });    
});

// middlewares
// assign review to a user
router.post('/assignreviewuser', (req, res, next)=>{

    var UserId = req.body.UserId;    
    var reviewId= req.body.reviewId;

    User.findOne({_id: UserId}, (err, user)=>{
        if (err) console.log(err);
        user.assignedReviews.push(reviewId);
        user.save((err, user)=>{
            if(err){
                res.json(err);
            } else {
                res.json('Review assigned to '+UserId);
            }
        });
    });
});





module.exports = router;