const express = require('express');
const { createPost, getPosts, toggleLike } = require('../controllers/postController');
const router = express.Router();

router.post('/', createPost);
router.get('/', getPosts);
router.put('/:postId/like', toggleLike);

module.exports = router;
