const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res) {
  try {
    let post = await Post.findById(req.body.post);

    if(post){
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id
      });
  
      post.comments.push(comment);
      await post.save();
      
      req.flash('success', 'Comment Sent!');
      return res.redirect('/');
    }
  } catch (err) {
    req.flash('error', err);
    return res.redirect('/');
  }
};

module.exports.destroy = async function(req, res) {
  try {
    let comment = await Comment.findById(req.params.id);

    let postId = comment.post;

    const post = await Post.findById(postId);

    if (comment.user == req.user.id || post.user == req.user.id) {
      // User is the creator of the comment or the post
      await Comment.findByIdAndDelete(req.params.id);

      post.comments.pull(req.params.id);

      await post.save();

      req.flash('success', 'Comment deleted!');
      
      return res.redirect('back');
    } else {
      req.flash('error', err);
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (err) {
    req.flash('error', err);
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};