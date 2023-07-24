const express = require('express');
const router = express.Router();

const global = require('../controllers/globalFunction');
const houseImages = require('./houseImages');
const verification = require('./verification');

const User = require('../models/user');
const Post = require('../models/posting');

router.get('/index', global.isAuthenticated, async (req, res) => {
    const posts = await Post.find({userId: req.user.username});
    res.render('landlord/index', {
        title: 'Your Listings',
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

router.post('/postings', global.isAuthenticated, houseImages.array('houseImages',4), async (req, res) => {
    // console.log(req.files[1].originalname);

    const post = new Post({
        subject: req.body.subject,
        description: req.body.description,
        price: req.body.price,
        userId: req.user.username,
        houseImages: req.files.map(f => f.originalname),
        isVerified: false
    });

    try{
        await post.save();
        console.log('Posting added');
        res.redirect('/landlord/verification/' + post._id);
    } catch(err){
        res.send(400);
    }
    
});

router.get('/verification/:_id', global.isAuthenticated, (req, res) => {
    res.render('landlord/verification',{
        title: 'Verification',
        user: req.user
    });
})

router.post('/verification/:_id', global.isAuthenticated, verification.single('verification'), async (req, res) => {
    try{
        const post = await Post.findOne({_id: req.params._id});
        post.verification = req.file.originalname;

        await post.save();
        console.log('Verification added');
        res.redirect('/landlord/index');
    } catch(err){
        res.send(400);
    }
});

module.exports = router;
