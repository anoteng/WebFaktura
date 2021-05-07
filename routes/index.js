var express = require('express');
var router = express.Router();
let menuItems = []
/* GET home page. */
router.get('/', function(req, res, next) {
  if(params.pageId === 'main' || params.pageId === false){
    menuItems = []
  }else if(params.pageId === 'customers') {
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
