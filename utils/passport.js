const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const HTTPBearerStrategy = require('passport-http-bearer').Strategy;

var User = require('../models/User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserial', id);
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    session: false
  }, function(email, password, done) {
    email = email.toLowerCase();
    User.findOne({
      email: email
    }, function(err, user) {
      
      if (!user) {
        return done(null, false, {
          message: 'Email ' + email + ' not found'
        });
      }

      user.comparePassword(password, function(err, isMatch) {
        if (isMatch) {
          return done(null, user);
        } else {
          console.log('Invalid email or password');
          console.log(err);
          return done(null, false, { message: 'Invalid email or password.' });
        }
      });
    });
}));

// passport.use(new HTTPBearerStrategy(function(token, done) {
//   User.findOne({
//     accessTokens: token
//   }, function(err, user) {
//     // TODO: figure out what to do with err.
    
//     if (!user) {
//       return done(null, false);
//     }

//     user.accessTokens.pull(token);

//     user.save(function(err) {
//       if (err) {
//         return done(err, user);
//       }
//       return done(null, user);
//     });
//   });
// }));
