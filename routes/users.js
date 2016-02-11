var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/User')
var userController = require('../controllers/users');

var users = {
  /*
    POST signup
    Expects: email, password, deviceToken
  */
  signup: function(req, res, next) {
  
    // Validate request
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password must be at least 6 characters long.').len(6);
    req.assert('deviceToken', 'Device token can\'t be empty.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      console.log(errors[0].msg);
      return res.status(400).send({
        message: errors[0].msg
      });
    }

    // Create User
    userController.create(req.body, function(err, message, user) {
      if (err) {
        return res.status(500).send({
          message: err
        });
      } else {
        return res.status(200).send({
          message: message,
          user: user
        });
      }
    });
  },

  /*
    POST login 
    Expects: email, password, deviceToken
  */
  login: function(req, res, next) {
    
    // Validate request
    req.assert('email', 'Email is not valid').isEmail();
    req.assert('password', 'Password must be at least 6 characters long.').len(6);
    req.assert('deviceToken', 'Device token can\'t be empty.').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
      console.log(errors[0].msg);
      return res.status(400).send({
        message: errors[0].msg
      });
    }

    passport.authenticate('local', function(err, user, info) {
      if (!user) {
        return res.status(500).send({
          message: 'Error logging in: ' + info.message
        });
      } else {
        req.logIn(user, function(err) {

          setTimeout(function() {
            notifications.send(user.deviceToken);
          }, 3000);

          return res.status(200).send({
            message: 'Successfully logged in!',
            user: user
          });
        });
      }
    })(req, res, next);

  },

  /*
    GET all
    Returns all of the users
  */
  get: function(req, res, next) {

    User.find({}).exec(function(err, users) {
      if (err) {
        return res.status(500).send({
          message: 'Error, could not retrieve users: ' + err
        });
      } else {
        return res.status(200).send({
          message: 'Successfully retrieved users!',
          users: users
        });
      }
    });

  }

}

module.exports = users;
