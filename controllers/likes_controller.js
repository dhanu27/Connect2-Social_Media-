const User=require("../models/usersDB");
const Post=require("../models/post");
const Like=require("../models/likes");
const Comment=require("../models/comment");


module.exports.toggle=async function(req,res){
       
   try{
       // likes/toggle/?id=&type=""
        let likeable;
        let deleted=false;

        if(req.query.type=='post'){
            likeable=await Post.findById(req.query.id).populate("likes");
        }else{
            likeable=await Comment.findById(req.query.id).populate("likes");   
            console.log("ooooo",likeable);
        }
   
        // If like already exist or not
        let existinglike=await Like.findOne({
            likeable:req.query.id,
            user:req.user._id,
            onModel:req.query.type
        })
        if(existinglike){
            likeable.likes.pull(existinglike._id);
            likeable.save();  
            existinglike.remove(); 
            deleted=true;
        }
        else{
           let newLike=await Like.create({
                likeable:req.query.id,
                user:req.user,
                onModel:req.query.type 
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        return res.json(200,{
            message:"Liked Sucessfully",
            data:{
                deleted:deleted
            }
        })
   }catch(err){
       console.log("Error in like controller",err);
    return res.json(540,{
        message:"Internal Server Error",
      })
   } 
    
   
}