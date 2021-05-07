var express = require('express');
var router = express.Router();
let menuItems = []
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.params.pageId === 'main' || req.params.pageId === false){
    menuItems = []
  }else if(req.params.pageId === 'customers') {
    menuItems = [
      {id: 'newCustomer',
        text: 'Ny kunde'},
      {id: 'showCustomers',
        text: 'Vis kunder'}
    ]
  }
  res.render('index.pug', { title: 'WebFaktura', pageId: req.params.pageId, menuItems: menuItems});
});

module.exports = router;
