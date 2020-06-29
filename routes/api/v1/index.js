const express=require('express');

console.log("Routers of  Api Loaded");
const router =express.Router();

router.use('/posts',require('./posts'));
router.use('/users',require('./user'));
module.exports=router;