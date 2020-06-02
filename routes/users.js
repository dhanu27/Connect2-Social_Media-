const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/user_controller');

router.get('/profile',passport.checkauthentication, usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/login', usersController.signIn);


router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/login'},
), usersController.createSession);

router.get('/sign-out',function(req,res){
    req.logOut();
    console.error("Something in routes")
    res.render('loginpage',{
        title:"Connect2"
    });
});
module.exports = router;