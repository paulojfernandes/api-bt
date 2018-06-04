
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var http = require('http');


var app = express();
app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }));
  


app.use(require('./controllers/controllers'))

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())


var port = process.env.PORT || 3000;


app.listen(port).on('error', function(err){
    console.log('on error handler');
    console.log(err);
});

process.on('uncaughtException', function(err) {
    console.log('process.on handler');
    console.log(err);
});