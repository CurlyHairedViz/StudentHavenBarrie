const express = require('express');
const router = express.Router();
const fs = require('fs');

const global = require('../controllers/globalFunction');

const User = require('../models/user');
const Post = require('../models/posting');


router.get('/approved', global.isAuthenticated, async (req, res) => {
    const posts = await Post.find();
    res.render('admin/approved', {
        title: 'approved Listings',
        posts,
        user: req.user
    });
});

router.get('/pending', global.isAuthenticated, async (req, res) => {
    const posts = await Post.find();
    res.render('admin/pending', {
        title: 'Pending Listings',
        posts,
        user: req.user
    });
});

router.post('/verify/:_id', global.isAuthenticated, async (req, res) => {
    try{
        const post = await Post.findOne({_id: req.params._id});
        post.isVerified = true;
        await post.save();
        console.log('Posting approved');
        res.redirect('/admin/approved');
    }
    catch(err){
        res.send(400);
    }
});

router.post('/reject/:_id', global.isAuthenticated, async (req, res) => {
    try{
        const post = await Post.findOne({_id: req.params._id});
        
        // delete house images
        for(let i = 0; i < post.houseImages.length; i++){
            fs.unlinkSync('./public/houseImages/' + post.houseImages[i]);
        }

        // delete verification image
        fs.unlinkSync('./public/verification/' + post.verification);
        
        await post.deleteOne();
        console.log('Posting approved');
        res.redirect('/admin/approved');
    }
    catch(err){
        res.send(400);
    }
});

module.exports = router;