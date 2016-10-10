var promise = require('bluebird');
var passport = require('passport');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/noteapp_db';
var db = pgp(connectionString);

module.exports = {
  createUser: createUser
};

function createUser(req, res, next) {
  console.log("creating user");
  db.none('insert into users(username, password)' +
      'values($1, $2)',
    [req.body.username, req.body.password])
    .then(function () {
      // log in newly created user
      passport.authenticate('local')

      res.status(200)
        .json({
          status: 'success',
          data: req.body.username,
          message: 'user created'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
