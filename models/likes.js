const mongoose=require('mongoose');

const like=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
       ref:"userschema"
    },
    // this define objectId for whom it like
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:"onModel",
        required:true
    },
    //  this define type of parent to get like it dynamic reference
    onModel:{
        type:String,
        enum:['post','comment'],
        required:true
    }

 },{timestamp:true});

 const Like=mongoose.model('like',like);
 module.exports=Like;