const {Sequelize} = require("sequelize");


const db = new Sequelize('BRM', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'

});

module.exports = db;