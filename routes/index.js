var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.pug', { title: 'WebFaktura', pageId: req.params.pageId });
});

module.exports = router;
