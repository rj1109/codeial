const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res) {
  try {
    const post = await Post.findById(req.body.post);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = await Comment.create({
      content: req.body.content,
      post: req.body.post,
      user: req.user._id
    });

    post.comments.push(comment);
    await post.save();

    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};