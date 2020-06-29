const Post= require("../../../models/post");
const User=require("../../../models/usersDB");
const Comment=require("../../../models/comment");
module.exports.index=async function(req,res){
    try{ 
        let posts=await Post.find({}).populate('user')
                            .sort('-createdAt')
                            .populate({path:'comments',
                                        populate:{
                                            path:'user'
                                        }
                                 }).sort('-createdAt');
        let users=await User.find({}).select("-password");
        return res.json(200,{
            post:posts,
            allusers:users,
            // var obj = this.toObject()
            message:"List of Posts"
        });
       }catch(err){
           console.log("*******Error*******",err);
           return res.json(500,{
            message:"Internal Server error"
        });
       } 
 
}

module.exports.destroyPost=async function(req,res){
    try{
        let post = await Post.findById(req.params.id);
          if(post.user==req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});
                return res.json(200,{
                    data:{
                        post:post
                    },
                    message:"Post get Deleted and comments associated with them also"
                })
            }else{
                return res.json(420,{
                    message:"User not authorized"
                })
            }     

    }catch(err){
      console.log("//////error\\\\\\\\\\",err);
      return res.status('500').json({
          message:"Internal Server Error"
      })
    }
}