const sequelize = require('../database/connection');
const createUsersTable = require('./create-users-table.js');

const runMigrations = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        await createUsersTable();
        console.log('Users table created successfully.');

        console.log('All migrations have been run successfully.');
    } catch (error) {
        console.error('Unable to run migrations:', error);
    } finally {
        await sequelize.close();
    }
};

runMigrations();