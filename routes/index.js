const express=require('express');
const app=express();

const routers =express.Router();
const homeController=require('../controllers/home_Controller');

console.log("Found router");

routers.get('/',homeController.home);
routers.use('/users',require('./users'));
routers.use('/posts',require('./posts'));

module.exports=routers;
