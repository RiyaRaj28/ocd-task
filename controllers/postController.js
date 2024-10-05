const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const { userId, content } = req.body;

  try {
    const newPost = new Post({ userId, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('userId', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toggleLike = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ msg: 'Post not found' });

    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json('Post unliked');
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json('Post liked');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
