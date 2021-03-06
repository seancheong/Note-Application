var settings = require('../settings');
var db = settings.getDbConnection();

// add query functions

module.exports = {
  listNotes: listNotes,
  getNote: getNote,
  createNote: createNote,
  updateNote: updateNote,
  removeNote: removeNote
};

function listNotes(req, res, next) {
  db.any('select * from notes where username = $1', req.user.username)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Listed all notes'
        });
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'error',
          message: err.detail
        });
    });
}

function getNote(req, res, next) {
  db.one('select * from notes where id = $1 and subject = $2 and username = $3',
    [req.params.id, req.params.subject, req.user.username])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one note'
        });
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'error',
          message: err.detail
        });
    });
}

function createNote(req, res, next) {
  db.none('insert into notes(subject, content, version, username)' +
      'values($1, $2, 1, $3)',
    [req.body.subject, req.body.content, req.user.username])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Created one note'
        });
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'error',
          message: err.detail
        });
    });
}

function updateNote(req, res, next) {
  db.none('update notes set content=$1, version=version+1 where id = $2 and subject=$3 and username=$4',
    [req.body.content, req.body.id, req.body.subject, req.user.username])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated note'
        });
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'error',
          message: err.detail
        });
    });
}

function removeNote(req, res, next) {
  db.result('delete from notes where id = $1 and subject = $2 and username = $3',
    [req.body.id, req.body.subject, req.user.username])
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed note'
        });
    })
    .catch(function (err) {
      res.status(500)
        .json({
          status: 'error',
          message: err.detail
        });
    });
}
