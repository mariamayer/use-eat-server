const express = require('express');
const session = require('express-session');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const unirest = require('unirest');
const passport   = require('passport');
const mongoose = require('mongoose');

const index = require('./routes/index');
const users = require('./routes/users');
const recipes = require('./routes/recipes');
const reviews = require('./routes/reviews');
const cors = require('cors');

// connect to the database
require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI);


var passportSetup = require('./configs/passport');
passportSetup(passport);

const app = express();
const port = (process.env.PORT || 5000);

app.listen(port, function(){
    console.log("Listening on port " + port);
});
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
