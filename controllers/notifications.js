var Notification = require('../models/Notification');

var notificationController = {
  
  /*
    Expects an object with the following format:
    {
      message: 'Hey whats up?',
      sender: ObjectId("56bc659e98876e325f9c6a0d"),
      recipient: ObjectId("56bc659e98876e325f9c6a0d"),
      date: Date
    }
  */
  create: function(body, cb) {
    var notification = new Notification(body);

    notification.save(function(err) {
      if (err) {
        cb('Error saving new notification: ' + err, null, null);
      } else {
        cb(null, 'Successfully saved new notification!', notification);
      }
    });
  },

};

module.exports = notificationController;
