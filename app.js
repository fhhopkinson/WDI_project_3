var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var mongoose = require('mongoose');
var router = require('./config/routes');


// 2 routes files, one for the API, one for the frontend
var apiRoutes = require('./config/routes/api');
var frontendRoutes = require('./config/routes/frontend');

mongoose.connect('mongodb://localhost/green-app');

// set up static views for index.html
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// hook up the routes
app.use('/api', apiRoutes);
app.get('/', frontendRoutes);


app.listen(3000);
