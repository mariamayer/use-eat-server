var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var unirest = require('unirest');
var passport   = require('passport');

var index = require('./routes/index');
var users = require('./routes/users');
var recipes = require('./routes/recipes');
var reviews = require('./routes/reviews');
var cors = require('cors');

// database connection
require('./configs/database');
var passportSetup = require('./configs/passport');
passportSetup(passport);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended:true, limit:'5mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(session({ secret: 'angular auth passport secret shh', resave: true, saveUninitialized: true, cookie : { httpOnly: true, maxAge: 2419200000 } }));
app.use(passport.initialize()); app.use(passport.session());

app.use('/', index);
app.use('/api/users', users);
app.use('/api/recipes', recipes);
app.use('/api/reviews', reviews);

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