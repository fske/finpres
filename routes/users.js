var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/post', function(req, res, next) {
  res.render('post', { title: 'Post'});
});

router.post('/post', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
