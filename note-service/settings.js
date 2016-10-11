var promise = require('bluebird');

var DB_URL = 'postgres://localhost:5432/noteapp_db';

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = DB_URL;
var db = pgp(connectionString);

module.exports = {
  getDbConnection: getDbConnection
};

function getDbConnection() {
  return db;
}
