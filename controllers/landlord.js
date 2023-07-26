const express = require('express');
const router = express.Router();
const fs = require('fs');

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

router.post('/postings', global.isAuthenticated, houseImages.array('houseImages', 5), async (req, res) => {
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

router.get('/delete/:_id', global.isAuthenticated, async (req, res) => {
    try{
        // find the post and delete the images
        const post = await Post.findOne({_id: req.params._id});

        for(let i = 0; i < post.houseImages.length; i++){
            fs.unlinkSync('./public/houseImages/' + post.houseImages[i]);
        }

        // delete verification image
        fs.unlinkSync('./public/verification/' + post.verification);

        await Post.deleteOne({_id: req.params._id});;
        console.log('Posting deleted');
        res.redirect('/landlord/index');
    } catch(err){
        res.send(400);
    }
});

module.exports = router;
