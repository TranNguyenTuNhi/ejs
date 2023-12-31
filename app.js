var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var homeroute = require('./routes/home');
var adminroute = require('./routes/admin');
var app = express();
var authRoute = require('./routes/authRo');

// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Middleware to serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.use('/', homeroute);
app.use('/api/auth', authRoute);

app.use('/admin',adminroute);

// 404 middleware
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler middleware
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
