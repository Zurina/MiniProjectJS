var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var constants = require('./constants.js/url')
var cors = require('cors')

require('./dbSetup')(constants.dbDevelopment)
// test data
require('./test/makeFriends')()



var viewRouter = require('./routes/views/views');
var apiRouter = require('./routes/api/api'); // api

var app = express();

// Cors
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/MiniProjectJSApollo', viewRouter);
app.use('/MiniProjectJSApollo/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  err['heh'] = 'Something went wrong'
  res.json(err)
});

module.exports = app;
