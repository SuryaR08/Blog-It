// controllers/userController.js

const { User, Property } = require('../models');

exports.getUserProfile = async (req, res) => {
    const userId = req.userId; // Extracted from the token in the middleware
    try {
        const user = await User.findByPk(userId, {
            include: [Property],
            attributes: ['id', 'username', 'email', 'phone'], // Make sure to include these attributes
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};
