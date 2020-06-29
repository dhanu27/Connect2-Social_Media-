const express=require('express');

console.log("Routers Loaded");
const routers =express.Router();

const homeController=require('../controllers/home_controller');

routers.use('/api',require('./api'));

routers.get('/',homeController.home);
routers.use('/users',require('./users'));
routers.use('/posts',require('./posts'));
routers.use('/comment',require('./comment'));


module.exports=routers;
