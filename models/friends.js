const mongoose=require('mongoose');

const friendSchema=new mongoose.Schema({
    // request from user
    from_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userschema"
    },
    // accept a user
    to_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userschema"
    }
},{timestamps:true});

const Friend=mongoose.model('Friend',friendSchema);

module.exports=Friend;

