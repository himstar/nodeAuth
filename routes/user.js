const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
router.post('/login', function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({email: email})
    .exec()
    .then(function(user) {
       bcrypt.compare(password, user.password, function(err, result){
          if(err) {
             return res.json({
                message: 'Unauthorized Access'
             });
          }
          if(result) {
             const jwtToken = jwt.sign({
                email: user.email,
                userLevel: user.userLevel,
                _id: user._id
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
    var name = req.body.name;
    var email = req.body.email;
    var userLevel = 0;
    var password = req.body.password;    
    bcrypt.hash(password, 10, function(err, hash){
       if(err) {
          return res.json({
             error: err
          });
       }
       else {
            var newUser = new User({
                name: name,
                email: email,
                userLevel: userLevel,
                password: hash
            });
            newUser.save((err, result)=>{
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
    if(req.session.user){
        var phone= req.body.phone;
        var gender= req.body.gender;
        var country= req.body.country;
        var profile_image= req.body.profile_image;
        var name= req.body.name;
        User.findOne({_id: req.session.user._id}, (err, user)=>{
            if (err) {
                console.log(err);
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
                        res.json('Profile updated for '+user.email);
                    }
                });
            }
        });
    } else {
        res.json({error: "unauthorised"});
    }
});
router.post('/profile/adminUpdate', (req, res, next)=>{
    var userId = req.body.userId;
    var phone= req.body.phone;
    var gender= req.body.gender;
    var country= req.body.country;
    var profile_image= req.body.profile_image;
    var name= req.body.name;
    User.findOne({_id: userId}, (err, user)=>{
        if (err) {
            console.log(err);
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
                    res.json('Profile updated for '+user.email);
                }
            });
        }
    });
});
module.exports = router;