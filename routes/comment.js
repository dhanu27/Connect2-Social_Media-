const express =require('express');
const passport=require('../config/passort-local-auth');
const router =express.Router();


const comment_controller=require('../controllers/comment_controller');

router.post('/create-comment',passport.checkauthentication, comment_controller.createComment); 
router.get('/destroy/:id',passport.checkauthentication,comment_controller.destroyComment);
module.exports=router;