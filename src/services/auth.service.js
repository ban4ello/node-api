const db = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const register = async (userData) => {
    const existingUserByEmail = await User.findOne({ where: { email: userData.email } });
    if (existingUserByEmail) {
        throw new Error('User with this email already exists');
    }

    const existingUserByUsername = await User.findOne({ where: { username: userData.username } });
    if (existingUserByUsername) {
        throw new Error('User with this username already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await User.create({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
    });

    return newUser;
};

const validateUser = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return null;
    }

    return user;
};

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, user };
};

const verifyEmail = async (email) => {
};

module.exports = {
    register,
    login,
    verifyEmail,
    validateUser,
    generateToken,
};