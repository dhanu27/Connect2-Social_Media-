const express=require('express');
const app=express();

const routers =express.Router();
const homeController=require('../controllers/home_controller');
const userController=require('../controllers/user_controller')
console.log("Found router");

routers.get('/',homeController.home);
routers.use('/users',require('./users'));
routers.use('/posts',require('./posts'));


routers.post('/create-user',userController.createUser);

module.exports=routers;
