require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var expressValidator = require('express-validator');

var users = require('./routes/users');
var notifications = require('./routes/notifications');
var passportConf = require('./utils/passport');

mongoose.connect(process.env.DB);

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());
app.use(passport.initialize());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.locals.user = req.user;
  next();
});

app.post('/v1/users/login', users.login);
app.post('/v1/users/signup', users.signup);
app.get('/v1/users/get', users.get);
app.post('/v1/notifications/send', notifications.send);

module.exports = app;
