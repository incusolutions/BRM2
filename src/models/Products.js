
const {DataTypes} = require('sequelize');
const db = require('../db/database');


const Products = db.define("Products", {
   
    lotNumber: {
        type:DataTypes.STRING
    },
    name: {
        type:DataTypes.STRING
    },
    price: {
        type:DataTypes.FLOAT
    },
    quantity: {
        type:DataTypes.INTEGER
    },
    entryDate: {
        type:DataTypes.DATE
    }
    
})

module.exports = Products;