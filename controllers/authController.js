const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create(username, email, hashedPassword);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findByUsername(username);

        if (!user) return res.status(401).json({ error: 'Invalid credentials' });
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(401).json({ error: 'Invalid credentials' });

        res.json({ message: 'Login successful', user: user.username });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error });
    }
};

exports.logout = async (req, res) => {
    res.status(200).json({ message: 'Successfully signed out' });
};
