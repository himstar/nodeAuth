var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('body-parser');

var app = express();
var port = 3000;

app.get('/', function(req, res){
    res.send('Welcome to app!');
});

app.listen(port, function(){
    console.log('Server running on port: '+port);
})