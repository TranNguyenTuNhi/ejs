var express = require('express');
var router = express.Router();


// Định nghĩa route cho trang home
router.get('/', (req, res) => {
  res.render('home'); // Render home.ejs
});

// Định nghĩa route cho trang login
router.get('/login', (req, res) => {
  res.render('login'); // Render login.ejs
});

// Định nghĩa route cho trang admin
router.get('/admin', (req, res) => {
  res.render('admin'); // Render admin.ejs
});

module.exports = router;
