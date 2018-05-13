const express = require('express');
const router = express.Router();

const Admin = require('../models/admins');

router.get('/all', (req, res, next)=> {
    Admin.find((err, admins)=>{
        res.json(admins);
    });
});
router.get('/:id', (req, res, next)=>{
    Admin.find({_id: req.params.id}, (err, result)=>{
        if(err){
            res.json(err);
        } else {
            res.json(result);
        }
    });
});
router.get('/email/:email', (req, res, next)=>{
    Admin.find({email: req.params.email}, (err, result)=>{
        if(err){
            res.json(err);
        } else {
            res.json(result);
        }
    });
});
router.post('/login', (req, res, next)=>{
    var email = req.body.email;
    var password = req.body.password;
    var token = req.body.token;
    Admin.findOne({ email: email, password: password, token: token }, (err, admin)=> {
        if (err) console.log(err);
        if (admin) {
            req.session.admin = admin;
            res.json({session: req.session.admin});
        } else {
            res.json("invalidLogin");
        }
    });
});
router.post('/add', (req, res, next)=>{
    var name= req.body.name;
    var email= req.body.email;
    var password= req.body.password;
    var token = req.body.token;
    Admin.findOne({ email: email }, (err, admin)=>{
        if (err) console.log(err);

        if (admin) {
            res.json("adminExists");
        } else {
            var newAdmin = new Admin({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                token: req.body.token
            });
            newAdmin.save((err, admin)=>{
                if(err){
                    res.json(err);
                } else {
                    res.json('Admin added successfully');
                }
            });
        }
    });
});

module.exports = router;