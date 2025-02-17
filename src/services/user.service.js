const db = require('../database/connection');
const User = require('../models/user.model');

const getAllUsers = async () => {
    return await User.findAll();
};

const getUserById = async (id) => {
    return await User.findByPk(id);
};

const createUser = async (userData) => {
    return await User.create(userData);
};

const updateUser = async (id, userData) => {
    const user = await User.findByPk(id);
    if (user) {
        return await user.update(userData);
    }
    throw new Error('User not found');
};

const deleteUser = async (id) => {
    const user = await User.findByPk(id);
    if (user) {
        await user.destroy();
        return true;
    }
    throw new Error('User not found');
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};