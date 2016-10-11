var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var promise = require('bluebird');

var authHelpers = require('./helpers');

var options = {
  promiseLib: promise
};

var strategyOptions = {};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/noteapp_db';
var db = pgp(connectionString);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.any('select * from users where id = $1', id)
    .then(function(user) {
      done(null, user[0]);
    })
    .catch(function(err) {
      done(err,null);
    });
});

passport.use(new LocalStrategy(strategyOptions, function(username, password, done) {
  db.any('select * from users where username = $1', username)
    .then(function (user) {

      if (!user) {
        console.log("no user");
        return done(null, false);
      }

      if (!authHelpers.comparePass(password, user[0].password)) {
        console.log("wrong password");
        return done(null, false);
      } else {
        console.log("correct login");
        return done(null, user[0]);
      }
    })
    .catch(function (err) {
      return done(err);
    });
}));

module.exports = passport;
