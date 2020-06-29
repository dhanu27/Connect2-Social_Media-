const Post=require('../models/post.js');
const Comment=require('../models/comment');

module.exports.posts=function(req,res){
    return res.send("<div><h1>No posts Available</h1></div>")
}
 
module.exports.createPost=async  function(req,res){
   
    try{
    //     console.log(req.files);
    //     let imgPath=async function(req,res){
    //         await Post.uploadedAvatar(req,res,function(err){
    //             console.log("One step Pass");
    //             if(err){console.log("%%%%%%%% Multer error%%%%%%%%%%%%%%%%"); return ;};
    //              console.log(req.file);
    //             return  Post.avatarPath+'/'+req.file.filename;
    //     });
    //   }
      
    //   let p=imgPath(req,res);
    //   console.log(p);
        
       let post=await Post.create({
          content:req.body.content,
          user:req.user._id
      });
       if(req.xhr){
        post=await Post.findById(post._id).populate('user','name');

        console.log(post);
           return res.status('200').json({
               
               data:{
                   post:post
               },
               message:"Post get Published"
           })
       }
      req.flash("success","Post Published");
      return res.redirect('back');
    }catch(err){
        req.flash('error',"Try again Later");
        return res.redirect('back');
    }  
}


module.exports.destroyPost=async function(req,res){
    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});
            if(req.xhr){
                return res.status('200').json({
                    data:{
                        post_id:req.params.id
                      
                    },
                    message:"Post get Deleted"
                })
            }
            req.flash("success", 'Post and associated comments deleted!');

            return res.redirect('back');
        }else{
            req.flash("error", 'You cannot delete this post!');
            return res.redirect('back');
        }

    }catch(err){
      console.log("error",err);
    }
}

