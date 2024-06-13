

const { User, Blog } = require('../models');

exports.getUserProfile = async (req, res) => {
    const userId = req.userId; 
    try {
        const user = await User.findByPk(userId, {
            include: [Blog],
            attributes: ['id', 'username', 'email'], 
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};
