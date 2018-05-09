const express = require('express');
const router = express.Router();

const User = require('../models/users');

router.get('/all', (req, res, next)=> {
    User.find((err, users)=>{
        res.json(users);
    });
});
router.get('/:id', (req, res, next)=>{
    User.find({_id: req.params.id}, (err, result)=>{
        if(err){
            res.json(err);
        } else {
            res.json(result);
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
router.post('/add', (req, res, next)=>{
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
router.delete('/:id', (req, res, next)=>{
    User.remove({_id: req.params.id}, (err, result)=>{
        if(err){
            res.json(err);
        } else {
            res.json('Contact deleted successfully');
        }
    });
});

module.exports = router;