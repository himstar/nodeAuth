var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var app = express();
var port = 3200;

const route = require('./routes/route');

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

app.use('/api', route);

// home route
app.get('/', function(req, res){
    res.send('Success');
})

app.listen(port, ()=>{
    console.log('Server Started at port: '+port);
});