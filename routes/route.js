const express = require('express');
const router = express.Router();

const Review = require('../models/reviews');
const Company = require('../models/companies');
const User = require('../models/users');

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