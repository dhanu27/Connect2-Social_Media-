const express=require('express'); 
const router=express.Router();


const userController=require('../controllers/user_controller');
router.get('/profile',userController.profile);
router.get('/login',userController.login);
router.get('/signup',userController.signup);

//Action for create User 
// router.post('/create-user',)




module.exports=router;