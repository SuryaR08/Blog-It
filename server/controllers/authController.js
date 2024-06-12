const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Please provide username, password, and email' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            username,
            password: hashedPassword,
            email,
        });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};




exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id }, 'mysecret', { expiresIn: '1h' });
        res.json({ token, userId: user.id });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};