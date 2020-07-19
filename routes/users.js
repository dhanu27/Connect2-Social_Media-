const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/user_controller');

router.get('/profile/:id',passport.checkauthentication, usersController.profile);
router.post('/update/:id',passport.checkauthentication,usersController.update);

router.get('/sign-up', usersController.signUp);
router.get('/login', usersController.signIn);
router.get('/forgot',usersController.forgotPage);
router.post('/forgotMail',usersController.forgotMail);

router.post('/create', usersController.create);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/login'},
), usersController.createSession);

router.get('/sign-out',usersController.destroySession);


module.exports = router;