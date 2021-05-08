var express = require('express');
var router = express.Router();
let menuItems = []
const pug = require('pug')
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.query.pageId === 'main' || req.query.pageId === false){
    menuItems = []
  }else if(req.query.pageId === 'customers') {
    menuItems = [
      {id: 'newCustomer',
        text: 'Ny kunde'},
      {id: 'showCustomers',
        text: 'Vis kunder'}
    ]
  }
  // console.log(req)
  //const mainPage = pug.compileFile('views/index.pug')
  //res.send(mainPage({ title: 'WebFaktura', pageId: req.query.pageId, menuItems: menuItems}))
  res.render('index.pug', { title: 'WebFaktura', pageId: req.query.pageId, menuItems: menuItems});
});

module.exports = router;
