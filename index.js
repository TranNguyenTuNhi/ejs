// app.js

const express = require('express');
const app = express();
const port = 3202;
const mongoose = require('mongoose');
const path = require('path');
const createError = require('http-errors');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const databaseUrl = 'mongodb+srv://TranNguyenTuNhi:nhi.mongoDB@cluster0.gz1rghh.mongodb.net/DatabaseStudents';

const connectDatabase = async (databaseUrl) => {
  try {
    await mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

connectDatabase(databaseUrl);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authRoute = require('./routes/authRo'); // Import your authentication routes
const homeroute = require('./routes/home'); // Import your home route
const adminroute = require('./routes/admin'); // Import your admin route

app.use('/', homeroute);
app.use('/admin', adminroute);
app.use('/api/auth', authRoute);

// 404 middleware
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler middleware
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
