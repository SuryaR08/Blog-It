// models/favorite.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user');
const Property = require('./property');

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
    propertyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Property,
            key: 'id',
        },
    },
}, {
    timestamps: true,
});


module.exports = Favorite;
