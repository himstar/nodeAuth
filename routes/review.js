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