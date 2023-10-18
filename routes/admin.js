//route admin
var express = require('express');
var router = express.Router();

// Định nghĩa route cho trang home
router.get('/admin', (req, res) => {
  res.render('admin'); // Render home.ejs
});
module.exports = router;
  