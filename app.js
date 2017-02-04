var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var index = require('./routes/index');
var users = require('./routes/users');
var routeCategory = require('./routes/category');
var routeCompany = require('./routes/company');
var routeMotor = require('./routes/motor');
var routeFeature = require('./routes/feature');
var routeAccessories = require('./routes/accessories');
var routeSpecification = require('./routes/specification');

var app = express();

console.log('connecting to database...');
mongoose.connect('mongodb://localhost:27017/api_motor', function(err){
  if(!err){
    console.log('connected to mongodb');
  }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/uploads')));
app.use('/', index);
app.use('/users', users);


app.use('/category', routeCategory);
app.use('/company', routeCompany);
app.use('/motor', routeMotor);
app.use('/feature', routeFeature);
app.use('/accessories', routeAccessories);
app.use('/specification',routeSpecification);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
