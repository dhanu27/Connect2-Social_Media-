const Post=require('../models/post.js');
const Comment=require('../models/comment');

module.exports.posts=function(req,res){
    return res.send("<div><h1>No posts Available</h1></div>")
}
module.exports.createPost=function(req,res){
      Post.create({
          content:req.body.content,
          user:req.user._id
      },function(err,post){
          if(err){
              console.log("Sorry not able to post");
              return ;
          }
          else{
           return res.redirect('back');
          }
      })
}


module.exports.destroyPost=function(req,res){
    Post.findById(req.params.id,function(err,post){
        if(err){console.log("Error in finding post"); return ;}
        // user who deleting the post is the user who posted a post
        if(post.user==req.user.id){
            post.remove();
            Comment.deleteMany({post:req.params.id},function(err){
               if(err){console.log("Error in Deleting a comment"); return;} 
                return res.redirect('back');
            });  
        }else{
         console.log("USer Not Delete this post");
            return res.redirect('back');
        }

    })
}

