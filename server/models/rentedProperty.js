const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user');
const Property = require('./property');

const RentedProperty = sequelize.define('RentedProperty', {
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    timestamps: true,
});


module.exports = RentedProperty;
