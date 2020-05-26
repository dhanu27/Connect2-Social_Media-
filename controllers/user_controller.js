const Userdb=require('../models/usersDB');

module.exports.profile=function(req,res){
   // console.log(req.query);
   console.log(req.cookies);
   if(req.cookies.user_id){
       Userdb.findById(req.cookies.user_id,function(err,user){
          if(err){console.log("Error in finding the user by id"); return;};
          if(user){
             console.log("hjkmliii");
               return res.render('profile',({
               title:"profile",
               name:user.name,
               email:user.email
            }));
          }
          else{
             return res.redirect('/users/login');
          }
       })
   }else{
      return res.redirect('/users/login');
   }  
}

// Render Sign up page
  module.exports.signup=function(req,res){
   console.log("Inside a Signup Controller");
   return res.render('signup')
}
//Render Login page
module.exports.login=function(req,res){
   res.render('loginPage');
}

// For Creating new User
module.exports.createUser=function(req,res){
   console.log(req.body);
    if(req.body.password!=req.body.cpassword){
      return res.redirect('back');
    }
    Userdb.findOne({email:req.body.email},function(err,user){
        if(err){console.log("Error in finding email"); return ;}
        if(!user){
            Userdb.create({
               'email':req.body.email,
               'password':req.body.password,
               'name':req.body.name
            },function(err,user){
               if(err){console.log("Error in while creating User Signing up ",err);
               Userdb.remove();
                return;}

               console.log("Inside a Create Users");
               
               return  res.redirect('users/login');
            });
        }else{
         return res.redirect('back');
        }
    });
}

// Create session
module.exports.CreateSession=function(req,res){
}