const User = require('../models/usersDB');


module.exports.profile = function(req, res){
    return res.render('profile', {
        title: 'User Profile'
    })
}


// render the sign up page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
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
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        console.log("Passwords are not smae");
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/login');
            })
        }else{
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}