const express=require('express');

console.log("Routers of  Api Loaded");
const router =express.Router();

router.use('/v1',require('./v1'));

module.exports=router;