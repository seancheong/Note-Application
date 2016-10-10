var express = require('express');
var router = express.Router();
var passport = require('passport');

// postgres queries
var db = require('../queries/users-queries');

router.post('/register', db.createUser);

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log("login success");

  res.status(200)
    .json({
      status: 'success',
      data: req.user.username,
      message: 'login successfully'
    });
});

router.post('/logout', function(req, res) {
  req.logout();

  res.status(200)
    .json({
      status: 'success',
      message: 'logout successfully'
    });
});

module.exports = router;
