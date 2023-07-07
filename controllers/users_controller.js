const User = require('../models/user');

//render the profile page
module.exports.profile = function(req, res){
    res.render("user_profile",{
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
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('users_sign_up',{
        title: 'Sign Up for Codeial'
    });
}

//render the sign in page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    res.render('users_sign_in',{
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
            const user = await User.create(req.body);
            return res.redirect('/users/sign-in');
        }else{
            res.redirect('back');
        }
        
    }catch(err){
        console.log("Error in finding user in sign up");
    }
    
}

//log in and create the session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    //logout function is given from passport to req
    req.logout(function(err){
        if(err){
            console.log('Error in Sign Out');
        }
        else{
            return res.redirect('/');
        }
    });
}