const Post=require('../models/post.js');
const User=require('../models/usersDB.js');
const Comment=require('../models/comment.js');
const moment=require('moment');
// populate the user details 
module.exports.home =async function(req, res){
   try{ 
    let posts=await Post.find({}).populate('user')
                        .sort('-createdAt')
                        .populate({
                                  path:'comments',
                                    populate:{
                                        path:'user',
                                    },
                                    populate:{
                                        path:'likes'
                                    }
                             }
                             ).sort('-createdAt').populate('likes');
           for(post of posts){
              for(comment of post.comments){ 
               console.log("Comments",comment.user.name,comment.content);
              }
           }                  
        // console.log("home Controller",posts[0].comments.name);                     
   
    let friends=await User.find({_id:req.user.id}).populate('friends');
    
    let SuggestedUsers=await User.find({ _id: { $ne: friends._id } });

    return res.render('home', {
                title: "Home",
                post:posts,
                suggestions:SuggestedUsers,
                friends:friends,
                moment: moment
    });
   }catch(err){
       console.log("Error",err);
   } 

}


