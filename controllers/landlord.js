const express = require('express');
const router = express.Router();

const global = require('../controllers/globalFunction');

const User = require('../models/user');

router.get('/postings', global.isAuthenticated, (req, res) => {
    res.render('landlord/postings',{
        title: 'Housing',
        user: req.user
    });
})

module.exports = router;
