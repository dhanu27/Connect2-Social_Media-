const express=require('express');

console.log("Routers Loaded");
const routers =express.Router();

const homeController=require('../controllers/home_controller');
const router = require('./api/v1/posts');

routers.use('/api',require('./api'));

routers.get('/',homeController.home);
routers.use('/users',require('./users'));
routers.use('/posts',require('./posts'));
routers.use('/comment',require('./comment'));
routers.use('/like',require('./like'));
routers.use('/friend',require('./friend'));

module.exports=routers;
