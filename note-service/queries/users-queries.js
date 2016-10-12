var passport = require('passport');

var authHelpers = require('../auth/helpers');
var settings = require('../settings');

var db = settings.getDbConnection();

module.exports = {
  createUser: createUser
};

function createUser(req, res, next) {
  console.log("creating user");
  db.none('insert into users(username, password)' +
      'values($1, $2)',
    [req.body.username, authHelpers.hashPass(req.body.password)])
    .then(function () {

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
