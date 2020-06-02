// var posts=[];
const Post=require('../models/post.js');

module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 25);
    Post.find({},function(err,posts){
        if(err){console.log("Error in finding in posts"); return res.redirect('back');}
         console.log(posts);
        return res.render('home', {
            title: "Home",
            post:posts
        });
    });
}
