var express = require('express');
var router = express.Router();

// postgres queries
var db = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Note Service' });
});

// list all notes
router.get('/api/notes', db.listNotes);

// get single note
router.get('/api/note/:subject', db.getNote);

// create new note
router.post('/api/note', db.createNote);

// update single note
router.put('/api/note', db.updateNote);

// remove single note
router.post('/api/delete-note', db.removeNote);

module.exports = router;
