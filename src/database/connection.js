const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

// Load environment variables from .env or .env.test
if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: '.env.test' });
} else {
    dotenv.config();
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
});

module.exports = sequelize;