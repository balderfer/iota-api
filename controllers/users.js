var User = require('../models/User');

var userController = {
  
  /*
    Expects an object with the following format:
    {
      email: 'john@doe.com',
      password: 'mypassword',
      deviceToken: 'fadsiuahebasgndoidszdaioewfnroawen'
    }
  */
  create: function(body, cb) {
    var user = new User({
      email: body.email,
      password: body.password,
      deviceToken: body.deviceToken
    });

    user.save(function(err) {
      if (err) {
        cb('Error saving new user: ' + err, null, null);
      } else {
        cb(null, 'Successfully saved new user!', user);
      }
    });
  },

  /*
    Takes and ID and returns the user via the callback,
    literally just a simplified db query
  */
  getUser: function(id, cb) {
    User.findById(id, function(err, user) {
      cb(err, user);
    });
  }

};

module.exports = userController;
