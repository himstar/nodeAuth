const express = require('express');
const router = express.Router();

const User = require('../models/users');

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

    User.findOne({ email: email }, function (err, user) {
        if (err) console.log(err);

        if (user) {
            res.json("userExists");
        } else {
            var newUser = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password
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
            res.json(email);
        } else {
            res.json("Login succesfull");
        }
    });
});

module.exports = router;