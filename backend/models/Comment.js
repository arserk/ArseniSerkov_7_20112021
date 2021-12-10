const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Comment = db.define('comment', {
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    tableName: 'comments' //change if you do not want to enforce this model name
});

module.exports = Comment;