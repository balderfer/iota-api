var apn = require('apn');
var apnConnection = new apn.Connection({});

var userController = require('../controllers/users');

var apnUtil = {
  
  send: function(notification, cb) {

    userController.getUser(notification.recipient, function(err, user) {

        var device = new apn.Device(user.deviceToken);
        var note = new apn.Notification();
        note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
        note.badge = 0;
        note.sound = "ping.aiff";
        note.alert = notification.message;
        note.payload = {'messageFrom': 'Caroline'};
        apnConnection.pushNotification(note, device);

        cb(null, 'Successfully sent the notification!');

    });
  }

};

module.exports = apnUtil;