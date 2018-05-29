var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var txt = [];
var http = require('http');


var app = express();


app.use(require('./controllers/controllers'))

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())


setInterval(function() {
    http.get("https://api-bt.herokuapp.com");
}, 150000);


var port = process.env.PORT || 3000;


app.listen(port)