const express = require('express');
const router = express.Router();

const User = require('../models/user');
const passport = require('passport');

// GET: Registration Request
router.get('/register', (req,res) => {
    let userType = req.session.userType?.userType;
    req.session.userType = [];
    res.render('auth/register', {
        title: 'Register',
        userType: userType,
        user: req.user
    });
});

// POST: Registration Request
router.post('/register',(req,res) =>{
    User.register(new User({
        username: req.body.username,
        userType: req.body.userType
    }),req.body.password,(err,user)=>{
        if(err){
            console.log(err);
        }
        else{
            req.session.userType = req.body.userType;
            console.log('Registered Successfully');
            res.redirect('/auth/login');
        }
    });
});

router.get('/login', (req,res) => {
    res.render('auth/login', {
        title: 'Login',
        user: req.user
    });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/auth/setRoles',
    failureRedirect: '/auth/login'
}));

router.get('/setRoles', (req,res) => {
    req.session.userType = req.user.userType;

    if(req.session.userType == 'Student')
    {
        console.log("This is a Student");
        res.redirect('/housing/listing');
    }
    else if(req.session.userType == 'Landlord')
    {
        console.log("This is a Landlord");
        res.redirect('/landlord/postings');
    }
    else if(req.session.userType == 'Admin')
    {
        console.log("This is an Admin");
        res.redirect('/');
    }
});

router.get('/logout', (req,res) => {
    req.logout((err) => {
        if(err) {
            console.log(err);
        }
        req.session.userType = [];
        res.redirect('/');
    })
})

module.exports = router;