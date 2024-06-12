const { Favorite } = require('../models');

exports.addToFavorites = async (req, res) => {
    const userId = req.userId;
    const { propertyId } = req.body;
    try {
        const favorite = await Favorite.create({ userId, propertyId });
        res.status(201).json(favorite);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.getUserFavorites = async (req, res) => {
    const userId = req.userId;
    try {
        const favorites = await Favorite.findAll({
            where: { userId },
            include: ['Property'],
        });
        res.json(favorites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

exports.removeFromFavorites = async (req, res) => {
    const userId = req.userId;
    const { propertyId } = req.params;
    try {
        const favorite = await Favorite.findOne({ where: { userId, propertyId } });
        if (!favorite) {
            return res.status(404).json({ error: 'Favorite not found' });
        }
        await favorite.destroy();
        res.status(200).json({ message: 'Favorite removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
