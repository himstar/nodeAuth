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
router.get('/email/:email', (req, res, next)=>{
    User.find({email: req.params.email}, (err, result)=>{
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
router.post('/resetpassword', (req, res, next)=>{
    var email = req.body.email;    
    var password= req.body.password;
    User.findOne({email: email}, (err, user)=>{
        if (err) {
            console.log(err);
        } else if(!user){
            res.json('User not exist');
        } else {
            user.password = req.body.password;
            user.save((err, user)=>{
                if(err){
                    res.json(err);
                } else {
                    res.json('Password updated for '+email);
                }
            });
        }
    });
});
router.post('/profile/update', (req, res, next)=>{
    var email = req.body.email;    
    var phone= req.body.phone;
    var gender= req.body.gender;
    var country= req.body.country;
    var profile_image= req.body.profile_image;
    var name= req.body.name;
    User.findOne({email: email}, (err, user)=>{
        if (err) {
            console.log(err)
        } else if(!user){
            res.json('User not exist');
        } else {
            user.phone = phone;
            user.gender = gender;
            user.country = country;
            user.name = name;
            user.profile_image = profile_image;
            user.save((err, user)=>{
                if(err){
                    res.json(err);
                } else {
                    res.json('Profile updated for '+email);
                }
            });
        }
    });
});
module.exports = router;