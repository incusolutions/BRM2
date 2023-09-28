const express = require('express');
require('dotenv').config();
const Products = require('../models/Products');
const Cart = require('../models/Cart');
const User = require('../models/User');

const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;



const router = express.Router();

function verificarToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado.' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token inválido.' });
    }

    req.usuario = decoded;
    next();
  });
}
// compras por cliente

router.get('/:id', verificarToken, async (req, res) => {

  const id = req.params.id;

  let products =[]



  try {

      console.log('AQI');

      const dataclient = await User.findOne({where:{id: id}});
     

      if(dataclient == null){
         return res.status(400).json({
            error: "No se encuentran usuarios"
        })
      }

      const vaucherdataclient = {name:dataclient.name,email:dataclient.email}

      const data = await Cart.findAll({where:{clientId: id}});

      if(data == null){
        return res.status(400).json({
           error: "No se encuentran items comprados"
       })
     }

      
      let totalprice = 0;
      let datevaucher ='';

      console.log(data);
     

        for (const { productId, quantity, date } of data) {
                
                  const producto = await Products.findByPk(productId);

                  console.log(producto);

                  if (producto) {
                     const productTotalPrice = producto.price * quantity;
                     totalprice += productTotalPrice;
                     datevaucher = date
                     products.push({name:producto.name,price:producto.price,quantity:quantity})
                  }
                
      
        }



      res.json({date:datevaucher,clientdata:vaucherdataclient,items:products,total:totalprice});
  }
  catch (error) {
      res.status(500).json({ message: error.message })
  }
});




 module.exports = router;