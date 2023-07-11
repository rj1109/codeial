const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
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
    try {
        let posts = await Post.find({})
          .populate('user')
          .populate({
            path: 'comments',
            populate: {
              path: 'user',
            }
          })
          .exec();
        
        let users = await User.find({});

        return res.render('home', {
          title: 'Codeial | Home',
          posts: posts,
          all_users: users
        });
      } catch (err) {
        console.log('Error while fetching posts and comments from the database', err);
        return;
      }
}
//module.exports.actionName = function(req, res){};

//using then
//Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then();