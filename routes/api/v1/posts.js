const express=require('express');
const router =express.Router();

 const postController=require('../../../controllers/api/v1/post_api');
const passport = require('passport');
 router.get('/',postController.index);
 router.delete('/:id',passport.authenticate('jwt',{session:false}),postController.destroyPost);

module.exports=router;