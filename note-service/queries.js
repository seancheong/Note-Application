var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/noteapp_db';
var db = pgp(connectionString);

// add query functions

module.exports = {
  listNotes: listNotes,
  getNote: getNote,
  createNote: createNote,
  updateNote: updateNote,
  removeNote: removeNote
};

function listNotes(req, res, next) {
  db.any('select * from notes')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Listed all notes'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getNote(req, res, next) {
  db.one('select * from notes where subject = $1', req.params.subject)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one note'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createNote(req, res, next) {
  db.none('insert into notes(subject, content, version)' +
      'values(${subject}, ${content}, 1)',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Created one note'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateNote(req, res, next) {
  db.none('update notes set content=$1, version=version+1 where subject=$2',
    [req.body.content, req.body.subject])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated note'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeNote(req, res, next) {
  db.result('delete from notes where subject = $1', req.body.subject)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed note'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
