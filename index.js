var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var http = require('http');


var app = express();
// app.use(cors({
//     'allowedHeaders': ['sessionId', 'Content-Type'],
//     'exposedHeaders': ['sessionId'],
//     'origin': '*',
//     'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     'preflightContinue': false
// }));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});



app.use(require('./controllers/controllers'))

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())


var port = process.env.PORT || 3000;


app.listen(port).on('error', function (err) {
    console.log('on error handler');
    console.log(err);
});

process.on('uncaughtException', function (err) {
    console.log('process.on handler');
    console.log(err);
});