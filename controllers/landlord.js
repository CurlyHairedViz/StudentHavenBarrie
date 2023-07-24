const express = require('express');
const router = express.Router();

const global = require('../controllers/globalFunction');

const User = require('../models/user');
const Post = require('../models/posting');

router.get('/index', global.isAuthenticated, async (req, res) => {
    const posts = await Post.find({userId: req.user.username});
    res.render('landlord/index', {
        title: 'Landlord Dashboard',
        posts,
        user: req.user
    });
});

router.get('/postings', global.isAuthenticated, (req, res) => {
    res.render('landlord/postings',{
        title: 'Housing',
        user: req.user
    });
})

router.post('/postings', global.isAuthenticated, async (req, res) => {
    const post = new Post({
        subject: req.body.subject,
        description: req.body.description,
        price: req.body.price,
        userId: req.user.username
    })

    try{
        await post.save();
        console.log('Posting added');
        res.redirect('/landlord/index');
    } catch(err){
        res.send(400);
    }
    
});

module.exports = router;
