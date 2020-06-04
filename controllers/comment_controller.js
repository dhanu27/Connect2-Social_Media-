const Comment =require('../models/comment');
const Post= require('../models/post');


module.exports.createComment=function(req,res){
  Post.findById(req.body.postId,function(err,post){
      if(err){console.log("Error in finding Post"); return ;}
   if(post){   
    Comment.create({
        content:req.body.content,
        post:req.body.postId,
        user:req.user._id,
    },function(err,comment){
        if(err){console.log("Not able to comment");return ;}
        post.comments.push(comment);
        post.save();
        return res.redirect("back");
    });
    }
   else
      return res.redirect('back'); 
  })
};


module.exports.destroyComment=function(req,res){
    console.log(req.params.id);
 
    Comment.findById(req.params.id,function(err,comment){
        if(err){console.log("Error in finding Comment"); return;}
      if(comment.user==req.user.id){ 
            let postId=comment.post; 
                comment.remove();
           Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
              return res.redirect('back');
           });
       }else{
          return res.redirect('back');
       }
     })
}  
