const express =require('express');
const router=express.Router();

const friendController=require('../controllers/friend_controller');
router.post('/add/:id',friendController.acceptRequest);

module.exports=router;