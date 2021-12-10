const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const Post = db.define('post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING
    },
    mediaURL: {
        type: DataTypes.STRING
    },
    upvote: {
        type: DataTypes.NUMBER,
        defaultValue: 0
    },
    downvote: {
        type: DataTypes.NUMBER,
        defaultValue: 0
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'users',
            key: 'username'
        }
    }
}, {
    tableName: 'posts' //change if you do not want to enforce this model name
});

module.exports = Post;