var express = require('express');
var router = express.Router();

// postgres notes queries
var db = require('../queries/notes-queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Note Service' });
});

// list all notes
router.post('/api/notes', isLoggedIn, db.listNotes);

// get single note
router.post('/api/view-note/:id/:subject', isLoggedIn, db.getNote);

// create new note
router.post('/api/note', isLoggedIn, db.createNote);

// update single note
router.put('/api/note', isLoggedIn, db.updateNote);

// remove single note
router.post('/api/delete-note', isLoggedIn, db.removeNote);

function isLoggedIn(req, res, next) {
  console.log(req.user);
  if(req.user) {
    return next();
  }
  console.log("user didn't log in");

  res.status(401)
    .json({
      status: 'error',
      message: 'Unauthorized access, please login'
    });
}

module.exports = router;
