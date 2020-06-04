const mongoose =require('mongoose');

const comment=new mongoose.Schema({
    content:{
      type:String,
      required:true
    },
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"userschema"
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
    }
},{
    timestamps:true
});

const Comment=mongoose.model('comment',comment);
module.exports=Comment;