const authService = require('../services/auth.service');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.validateUser(email, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = authService.generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const newUser = await authService.register({ email, username, password });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.verifyEmail = async (req, res) => {
    try {
        const { token } = req.params;
        const result = await authService.verifyEmailToken(token);
        if (!result) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};