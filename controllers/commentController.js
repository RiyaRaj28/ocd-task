const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.addComment = async (req, res) => {
  const { postId } = req.params;
  const { userId, content } = req.body;

  try {
    const newComment = new Comment({ postId, userId, content });
    await newComment.save();

    await Post.findByIdAndUpdate(postId, { $push: { comments: newComment._id } });
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
