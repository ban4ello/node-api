const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Manufacturer = sequelize.define('Manufacturer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    established: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

// Add any additional methods or hooks here

module.exports = Manufacturer;