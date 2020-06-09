const Comment =require('../models/comment');
const Post= require('../models/post');
const User=require('../models/usersDB');


module.exports.createComment=async function(req,res){
   try{ 
        let post=await Post.findById(req.body.postId);
            if(post){   
                let comment=await Comment.create({
                    content:req.body.content,
                    post:req.body.postId,
                    user:req.user._id,
                });
                    post.comments.push(comment);
                    post.save();

                    console.log("jjjj");
                    if(req.xhr){
                        console.log("Xhr request");
                        comment=await Comment.findById(comment._id).populate('user','name');
                        console.log(comment);
                        return res.status("200").json({
                            data:{
                                comment:comment
                            },
                            message:"Commented successfully"
                        });
                    }
                    req.flash("success","Your comment has been added");
                    return res.redirect('back');
                }
            else
               return res.redirect('back'); 
    }catch(err){
        req.flash("error",err);
        return res.redirect('back');
    }    
}


module.exports.destroyComment=async function(req,res){
   
   try{ 
    let comment=await Comment.findById(req.params.id);
      if(comment.user==req.user.id){ 
            let postId=comment.post; 
                comment.remove();
           await Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}});
           console.log("Deleted Comment");
           if(req.xhr){
               console.log("To destroy comment");
            return res.status('200').json({
                data:{
                    comment_id:req.params.id
                },
                message:"Comment get Deleted"
            });
         }
           req.flash("success","comment get deleted");
       }
    return res.redirect('back');
   }catch(err){
    req.flash("error","Something went wrong");
       console.log("Error",err);
   }
}  
