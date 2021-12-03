const { Sequelize } = require('sequelize');

//Create connection
module.exports = new Sequelize('groupomania', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});