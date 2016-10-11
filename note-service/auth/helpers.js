var bcrypt = require('bcryptjs');

module.exports = {
  hashPass: hashPass,
  comparePass: comparePass
};

function hashPass(userPassword) {
  var salt = bcrypt.genSaltSync();
  var hash = bcrypt.hashSync(userPassword, salt);

  return hash;
}

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}
