const Post=require('../models/post.js');

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

