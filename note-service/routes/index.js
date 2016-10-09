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
router.get('/api/note', db.getNote);

// create new note
router.post('/api/note', db.createNote);

// update single note
router.put('/api/note', db.updateNote);

// remove single note
router.delete('/api/note', db.removeNote);

module.exports = router;
