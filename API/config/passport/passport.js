var bCrypt = require('bcrypt-nodejs');
const jsonMessagesPath = __dirname + "/../../assets/jsonMessages/";
var jsonMessages = require(jsonMessagesPath + "login");

module.exports = function(passport, user) {
  var User = user;
  var LocalStrategy = require('passport-local').Strategy;
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
      if (user) {
        done(null, user.get());
      }
      else {
        done(user.errors, null);
      }
    });
  });
  passport.use('local-signup', new LocalStrategy({
      user_idField: 'user_id',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback

    },
    function(req, user_id, password, done) {
      var generateHash = function(password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };
      User.findOne({ where: { user_id: user_id } }).then(function(user) {
        if (user) {
          return done(null, false, jsonMessages.user.duplicate);
        }
        else {
          var userPassword = generateHash(password);
          var data = {
            user_id: user_id,
            password: userPassword,
            nome: req.body.firstname,
            apelido: req.body.lastname
          };
          User.create(data).then(function(newUser, created) {
            if (!newUser) {
              return done(null, false);
            }
            if (newUser) {
              return done(null, newUser);
            }
          });
        }
      });
    }
  ));
  //LOCAL SIGNIN
  passport.use('local-signin', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      user_idField: 'user_id',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, user_id, password, done) {
      var User = user_id;
      var isValidPassword = function(userpass, password) {
        return bCrypt.compareSync(password, userpass);

      }
      User.findOne({ where: { user_id: user_id } }).then(function(user) {
        if (!user) {
          return done(null, false, jsonMessages.user.user_id);
        }
        if (!isValidPassword(user.password, password)) {
          return done(null, false, jsonMessages.user.password);
        }
        var userinfo = user.get();
        return done(null, userinfo);
      }).catch(function(err) {
        console.log("Error:", err);
        return done(null, false,  jsonMessages.user.error);
      });
    }
  ));
}