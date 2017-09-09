var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // if (req.params.inputEmail) {
    res.render('index', { title: 'Express' });
  // } else {
  //   res.render('login');
  // }
});

router.post('/', function(req, res, next) {
  if (req.params.inputEmail) {
    res.render('index', { title: 'Express' });
  } else {
    res.render('login');
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
  res.render('library', { title: 'Express' });
});

module.exports = router;
