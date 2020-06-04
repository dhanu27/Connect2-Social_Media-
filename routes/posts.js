const express =require('express');
const passport=require('../config/passort-local-auth');
const router =express.Router();


const post_controller=require('../controllers/post_controller');
const comment_controller=require('../controllers/comment_controller');

router.get('/',post_controller.posts);

router.post('/create-post',passport.checkauthentication,post_controller.createPost);
router.post('/create-comment', comment_controller.createComment); 


router.get('/destroy/:id',passport.checkauthentication,post_controller.destroyPost);
module.exports=router;
