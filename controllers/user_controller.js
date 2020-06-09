const User = require('../models/usersDB');


module.exports.profile =async function(req, res){
   try{ 
    let user=await User.findById(req.params.id);
        return res.render('profile', {
            title: 'User Profile',
            profile_user:user
        });
    }catch{
        console.log("error",err);
    }   
}


// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated())
        return res.redirect('/users/profile');
   else{ 
    return res.render('signup', {
        title: "Connect2 | Sign Up"
    })
   } 
}


// render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        console.log("After clicking signin button");
        return res.redirect('/',{
            title:"Connect2 | Home",
        });
    }
    return res.render('loginpage', {
        title: "Connect2 | Sign In"

    })
}

// get the sign up data
module.exports.create =async function(req, res){
   try{
        if (req.body.password != req.body.confirm_password){
            req.flash("error","Passwords are not same");
            return res.redirect('back');
        }
        let user=await User.findOne({email: req.body.email}); 

            if (!user){
                    await User.create(req.body);//can u runonce what run yp
                    return res.redirect('/users/login');
            }else{
               req.flash("error","Alreay exits try with another");
                return res.redirect('back');
            }
   }catch(err){
     req.flash("error",err);
   } 
}

module.exports.update=function(req,res){
    console.log(req.params.id);
   if(req.params.id==req.user.id){ 
       console.log(req.body);
    User.findByIdAndUpdate(req.user.id,req.body,function(err,user){
        if(err){console.log("Error",err); return ;}
        req.flash("success","Profile Get Updated");
        return res.redirect('back');//no flash is working?Previously working but before 1hr it not .what changes u made?i made changes but remove
    })
   }else{
    req.flash("error","Unauthorized");
     return res.status(401).send('Unauthorized');
   }
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash("success","You logged in ");
    return res.redirect('/');
}

module.exports.destroySession=function(req,res){
        req.logOut();
        req.flash('success',"You have Logged out");
        res.redirect('/');
}