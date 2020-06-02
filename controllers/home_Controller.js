const Post=require('../models/post.js');


// populate the user details 
module.exports.home = function(req, res){
    Post.find({}).populate('user').exec(function(err,posts){
        console.log(posts);
            return res.render('home', {
           title: "Home",
           post:posts
       });
    });
}
