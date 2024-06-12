const express = require('express');
const { addToFavorites, getUserFavorites, removeFromFavorites } = require('../controllers/favoritesController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addToFavorites);
router.get('/', authMiddleware, getUserFavorites);
router.delete('/:propertyId', authMiddleware, removeFromFavorites);

module.exports = router;
