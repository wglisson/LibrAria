var express = require('express');
var router = express.Router();
var database = require('../server/database.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  // if (req.params.inputEmail) {
    res.render('index', { title: 'Express' });
  // } else {
  //   res.render('login');
  // }
});

router.post('/', function(req, res, next) {
  if (req.body) {
    database.addSongEntry(req.body, function(){});
    res.end();
  } else {
    res.end();
  }
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/spotify', function(req, res, next) {
    res.render('spotify', { title: 'Express' });
});

router.get('/library', function(req, res, next) {
  var userSongs;
  database.getSongsByUser("1", function(songList) {
    userSongs = songList;
    res.render('library', {
      title: 'LibrAria',
      songs: userSongs
    });
  });
});

module.exports = router;
