const express = require('express');
const router = express.Router();

const Review = require('../models/reviews');

router.get('/all', (req, res, next)=> {
    Review.find((err, reviews)=>{
        res.json(reviews);
    });
});
router.get('/:id', (req, res, next)=>{
    Review.find({_id: req.params.id}, (err, result)=>{
        if(err){
            res.json(err);
        } else {
            res.json(result);
        }
    });
});
router.post('/add', (req, res, next)=> {
    var rating= req.body.rating;
    var reviewText= req.body.reviewText;
    var reviewTitle= req.body.reviewTitle;
    var assignedUser= req.body.userId;
    var assignedCompany= req.body.companyId;
    var newReview = new Review({
        rate: rating,
        review: reviewText,
        title: reviewTitle,
        assignedUser: assignedUser,
        assignedCompany: assignedCompany
    });
    newReview.save((err, review)=>{
        if(err){
            res.json(err);
        } else {
            res.json('Review added successfully');
        }
    });    
});
router.delete('/:id', (req, res, next)=>{
    Review.remove({_id: req.params.id}, (err, result)=>{
        if(err){
            res.json(err);
        } else {
            res.json('Review deleted successfully');
        }
    });
});

module.exports = router;