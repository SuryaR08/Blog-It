const express = require('express');
const { getUserProfile, getUserFavorites } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/me', authMiddleware, getUserProfile);

module.exports = router;
