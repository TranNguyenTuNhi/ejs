//route admin
const e = require('express');
var express = require('express');
var router = express.Router();

// Định nghĩa route cho trang home
router.get('/', (req, res) => {
  res.render('home'); // Render home.ejs
});
module.exports = router;