
const {DataTypes} = require('sequelize');
const db = require('../db/database');
const Cart = require('./Cart');


const Users = db.define("Users", {
   
    name: {
        type:DataTypes.STRING
    },
    email: {
        type:DataTypes.STRING
    },
    password: {
        type:DataTypes.STRING(1234)
    },
    role: {
        type:DataTypes.STRING
    }
    
})



module.exports = Users;