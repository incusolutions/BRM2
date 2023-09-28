
const {DataTypes} = require('sequelize');
const db = require('../db/database');



const Cart = db.define("Cart", {

  clientId: {
    type: DataTypes.INTEGER,
  },
  productId: {
    type: DataTypes.INTEGER,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  date: {
    type:DataTypes.DATE
  },
  vaucherid: {
    type:DataTypes.STRING
  }


  
 
    
})



module.exports = Cart;