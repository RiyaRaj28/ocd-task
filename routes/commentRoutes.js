const express = require('express');
const { addComment } = require('../controllers/commentController');
const router = express.Router();

router.post('/:postId/comment', addComment);

module.exports = router;
