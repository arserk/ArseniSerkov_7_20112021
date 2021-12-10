const { Sequelize } = require('sequelize');

//Create connection 
//root is login and 'password' is pwd for the local MySql connection - change based on your local
module.exports = new Sequelize('groupomania', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});