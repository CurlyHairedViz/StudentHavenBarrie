const express = require('express');
const router = express.Router();

const global = require('../controllers/globalFunction');

const User = require('../models/user');
const Post = require('../models/posting');

router.get('/index', global.isAuthenticated, async (req, res) => {
    const posts = await Post.find();
    res.render('student/index', {
        title: 'House Listings',
        posts,
        user: req.user
    });
});

module.exports = router;