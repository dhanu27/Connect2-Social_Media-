const Post=require('../models/post.js');
const User=require('../models/usersDB.js');
const Comment=require('../models/comment.js');
const moment=require('moment');
const mongoose=require('mongoose');
// populate the user details 
module.exports.home =async function(req, res){
   try{ 
    let posts=await Post.find({}).populate('user')
                        .sort('-createdAt')
                        .populate({
                                  path:'comments',
                                    populate:{
                                        path:'user likes',
                                    }
                             }).sort('-createdAt').populate('likes');
           for(post of posts){
              for(comment of post.comments){ 
               console.log("Comments",comment.user.name,comment.content);
              }
           }                    
           let friends=[];
           let SuggestedUsers=[];                 
   if(req.user){
     let user=await User.find({_id:req.user.id}).populate('friends.from_user');                                                
    let friendsList=user[0].friends;
     let users=await User.find({});
        users.map((user)=>{ 
        if(friendsList.includes(user.id)){
           console.log("f");
           friends.push(user);
        }else{
         // console.log("s",user);
         SuggestedUsers.push(user);
        }
      }); 
   }
   console.log("$$$Friends",friends);

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


