// models/favorite.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user');
const blog = require('./blog');

const Favorite = sequelize.define('Favorite', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    blogId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: blog,
            key: 'id',
        },
    },
}, {
    timestamps: true,
});


module.exports = Favorite;
