const User = require('../models/usersDB');
const fs=require('fs');
const path=require('path');
const  forgotMailer=require('../mailers/forgot_mailer');
const queue=require('../config/kue');
const forgotMailWorker=require('../worker/forgot_email_worker');

module.exports.profile =async function(req, res){
   try{ 
    let user=await User.findById(req.params.id);
    let toggle=false;
    if(req.params.type=='friends'){
        toggle=true;
    }
        return res.render('profile', {
            title: 'User Profile',
            profile_user:user,
            toggle:toggle
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
                    await User.create(req.body);
                    return res.redirect('/users/login');
            }else{
               req.flash("error","Alreay exits try with another");
                return res.redirect('back');
            }
   }catch(err){
     req.flash("error",err);
   } 
}
module.exports.forgotPage=function(req,res){
    return res.render('forgot_password');
}
module.exports.forgotMail=async function(req,res){
   
    console.log(req.body);

    let user=await User.findOne({email:req.body.email});
    console.log("From forgotMail",user);
    if(user){
    let job = queue.create('emails', user
      ).save( function(err){
    if(err ){ console.log( "Error in enqueue the comment on post email",err); return;}
    console.log("JobId",job.id);
    });
   }else{
       console.log("Incorrect email");
   }
   return ;    
}

module.exports.update=async function(req,res){
        
    try{
         
        if(req.params.id==req.user.id){ 
               let user=await User.findById(req.params.id);
                await User.uploadedAvatar(req,res,function(err){
                     if(err){console.log("%%%%%%%% Multer error%%%%%%%%%%%%%%%%"); return ;};
                     user.name=req.body.name;
                     user.email=req.body.email;
                     if(req.file){
                        // To check file exist if it is remove it
                        if(user.avatar){
                            if(fs.existsSync(path.join(__dirname,"..",user.avatar))){
                               fs.unlinkSync(path.join(__dirname,"..",user.avatar));
                            }
                        }
                           //  this is saving the file path  in the avatar field of the user 
                         user.avatar=User.avatarPath+'/'+req.file.filename;
                         console.log(user);
                     }
                     user.save();  
                 });
                    req.flash("success","Profile Get Updated");
                    return res.redirect('back');
            }     
    }catch{
        req.flash("error",err);
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