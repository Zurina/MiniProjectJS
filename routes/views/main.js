var express = require('express');
var mainRouter = express.Router();

/* GET home page. */
mainRouter.get('/', function(req, res, next) {
  res.render('main', { title: 'Friends App' });
});

module.exports = mainRouter;
