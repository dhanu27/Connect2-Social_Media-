const Post=require('../models/post.js');
const User=require('../models/usersDB.js');

// populate the user details 
module.exports.home =async function(req, res){
   try{ 
    let posts=await Post.find({}).populate('user')
                        .sort('-createdAt')
                        .populate({path:'comments',
                                    populate:{
                                        path:'user'
                                    }
                             }).sort('-createdAt');
    let users=await User.find({});
    return res.render('home', {
                title: "Home",
                post:posts,
                allusers:users
    });
   }catch(err){
       console.log("Error",err);
   } 

}


