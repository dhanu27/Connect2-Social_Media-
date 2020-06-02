const express =require('express');
const passport=require('../config/passort-local-auth');
const router =express.Router();


const post_controller=require('../controllers/post_controller');
router.get('/',post_controller.posts);

router.post('/create-post',passport.checkauthentication,post_controller.createPost);
module.exports=router;
