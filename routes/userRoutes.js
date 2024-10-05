const express = require('express');
const { followUser, getUserProfile } = require('../controllers/userController');
const router = express.Router();

router.put('/:id/follow', followUser);
router.get('/user/:userId', getUserProfile);

module.exports = router;
