const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user');
const Blog = require('./blog');
const Favorite = require('./favourite');

User.hasMany(Blog, { foreignKey: 'userId' });
Blog.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Favorite, { foreignKey: 'userId' });
Blog.hasMany(Favorite, { foreignKey: 'blogId' });
Favorite.belongsTo(User, { foreignKey: 'userId' });
Favorite.belongsTo(Blog, { foreignKey: 'blogId' });




const initModels = async () => {
    await User.sync({ alter: true });
    await Blog.sync({ alter: true });
    await Favorite.sync({ alter: true });
};

module.exports = { User, Blog, Favorite, initModels };
