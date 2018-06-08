var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var cookieParser = require('cookie-parser');

var app = express();
var port = 3200;

const route = require('./routes/route');
const user = require('./routes/user');
const company = require('./routes/company');
const review = require('./routes/review');
const admin = require('./routes/admin');

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/clist');

mongoose.connection.on('connected', ()=>{
    console.log('Connected to mongodb');
});

mongoose.connection.on('error', (err)=>{
    if(err){
        console.log('Error in mongo '+err);
    }
})

// middleware
app.use(cors());

app.set('json spaces', 4);

// parse json
app.use(bodyParser.json());
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({extended: true}));

// session
app.use(cookieParser());

app.use('/api/common', route);
app.use('/api/user', user);
app.use('/api/company', company);
app.use('/api/review', review);
app.use('/api/admin', admin);

// home route
app.get('/api', function(req, res){
    res.send('Success');
});
app.get('/logout', (req, res, next)=>{
    req.session.destroy(function(err) {
        if(err) {
          console.log(err);
        } else {
          res.json('All session killed');
        }
    });
});
app.listen(port, ()=>{
    console.log('Server Started at port: '+port);
});