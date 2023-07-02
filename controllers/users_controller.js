const User = require('../models/user');

//render the profile page
module.exports.profile = function(req, res){
    res.render("usersProfile",{
        title: "Users Profile"
    });
}

//render the posts page
module.exports.posts = function(req, res){
    res.render("usersPosts",{
        title: "Your Posts"
    });
}

//render the sign up page
module.exports.signUp = function(req, res){
    res.render('users_sign_up',{
        title: 'Sign Up for Codeial'
    });
}

//render the sign in page
module.exports.logIn = function(req, res){
    res.render('users_log_in',{
        title:'Log In to Codeial'
    });
}

//get the sign up data
module.exports.create = async function(req, res){

    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    try{
        const user = await User.findOne({email: req.body.email});

        if(!user){
            User.create(req.body);
            return res.redirect('/users/log-in');
        }else{
            res.redirect('back');
        }
        
    }catch(err){
        console.log("Error in finding user in sign up");
    }
    
}

//log in and create the session for the user
module.exports.createSession = function(req, res){
    //TODO LATER
}