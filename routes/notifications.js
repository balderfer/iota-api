var express = require('express');
var passport = require('passport');

var notificationsController = require('../controllers/notifications');
var apnUtil = require('../utils/apnUtil');

var notifications = {
  /*
    POST send notification
    Expects: email, password, deviceToken
  */
  send: function(req, res, next) {
  
    notificationsController.create(req.body, function(err, message, notification) {
      if (err) {
        console.log(err);
      } else {
        console.log(message);
        apnUtil.send(notification, function(err, message) {
          if (err) {
            return res.status(500).send({
              message: err
            });
          } else {
            return res.status(200).send({
              message: message
            });
          }
        });
      }
    });

  },

}

module.exports = notifications;
