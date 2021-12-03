const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    fullName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    tableName: 'users'
});

module.exports = User;