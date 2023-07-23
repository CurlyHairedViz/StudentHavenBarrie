var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { 
    title: 'Student Haven',
    user: req.user
  });
});

router.get('/about', (req, res) => {
  res.render('about', { 
    title: 'About The Haven',
    user: req.user
  });
});

router.get('/contact', (req, res) => {
  res.render('contact', { 
    title: 'Contact The Haven',
    user: req.user
  });
});

module.exports = router;
