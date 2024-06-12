// config/db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('blogit', 'root', 'Surya@08', {
  host: 'localhost',
  dialect: 'mysql',
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };
