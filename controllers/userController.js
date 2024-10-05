const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.followUser = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const userToFollow = await User.findById(id);
    const currentUser = await User.findById(userId);

    if (!userToFollow.followers.includes(userId)) {
      await userToFollow.updateOne({ $push: { followers: userId } });
      await currentUser.updateOne({ $push: { following: id } });
      res.status(200).json('User followed');
    } else {
      await userToFollow.updateOne({ $pull: { followers: userId } });
      await currentUser.updateOne({ $pull: { following: id } });
      res.status(200).json('User unfollowed');
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId; 

    const user = await User.findById(userId)
      .populate('followers', 'username')    
      .populate('following', 'username')    
      .populate({
        path: 'posts',                      
        populate: { path: 'comments', select: 'text author' }, 
      })
      .populate({
        path: 'likes',                      
        populate: { path: 'comments', select: 'text author' }, 
      })
      .populate({
        path: 'comments',                   
        populate: { path: 'post', select: 'content' }, 
      });

    if (!user) {
      return res.status(404).json({ msg: 'User  not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
