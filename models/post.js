const mongoose=require('mongoose');
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/posts/avatar');

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    } ,
   user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'userschema'
   },
   comments:[
           {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comment'
           }
         ],
   avatar:{
     type:String
     }
    },
   {
    timestamps:true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

// static methods 
postSchema.statics.uploadedAvatar= multer({storage:storage}).single('avatar');
postSchema.statics.avatarPath=AVATAR_PATH;



const post= mongoose.model('Post',postSchema);
module.exports=post;