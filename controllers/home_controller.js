const Post = require('../models/post');

module.exports.home =async function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id',25);

    // try{
    //     const posts = await Post.find({});

    //     return res.render("home",{
    //         title:"Home",
    //         posts: posts
    //     });
    // }catch(err){
    //     console.log("Error while rendering the post on home page from database",err);
    // }

    //populate the user of each post
    try{
        const posts =await Post.find({}).populate('user');

        return res.render("home",{
            title:"Home",
            posts: posts
        });

    }catch(err){
        console.log('Error while fetching profile information of the post', err);
    }
    
}

//module.exports.actionName = function(req, res){};