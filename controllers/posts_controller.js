const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create =async function(req, res){
    try{
        const post = await Post.create({
            content:req.body.content,
            user: req.user._id
        });

        return res.redirect('back');
    }catch(err){
        console.log("Error in pushing post data to database",err);
    }
}

module.exports.destroy = async function(req, res){
    try{
        const post =await Post.findById(req.params.id);

        if(post && post.user == req.user.id){
            await Post.deleteOne({_id: post._id});
            await Comment.deleteMany({post: req.params.id});
            return res.redirect('back');
        }else{
            res.redirect('back');
        }
    }catch(err){
        console.log('Error in deleting the post in post controller', err);
    }
}