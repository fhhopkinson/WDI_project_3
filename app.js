var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var mongoose = require('mongoose');
var router = require('./config/routes');

mongoose.connect('mongodb://localhost/green-app');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/', router);

app.listen(3000);
