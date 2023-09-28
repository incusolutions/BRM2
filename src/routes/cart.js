const express = require('express');
const Products = require('../models/Products');
const Cart = require('../models/Cart');
const User = require('../models/User');



const router = express.Router();



 router.post('/add', async (req, res) => {

     const { clientId, date, products } = req.body;

     let status = false;
     let objerror=[];
     let objok=[];

  
     let vaucherid = (Math.random()+1).toString(36).slice(2, 18);
     
 
  
      try{
    
              for (const { productId, quantity } of products) {
              
                      const producto = await Products.findByPk(productId);
              
                    if (producto) {
                        const data = await Cart.create({clientId, productId, quantity,date,vaucherid});
                        objok.push(productId);
                    }
                    else{
                      objerror.push(productId);
                    }
                  
              }

              objerror.length>0 ? 
                res.status(201).json({ message: 'Productos agregagados con exito -'+ objok.length + '- con Ids -' + objok +'- fueron agregados al carrito con éxito. '+ 'Productos que no existen -'+objerror.length + ' - con Ids -'+objerror })
              :
              res.status(201).json({ message: 'Productos agregagados con exito -'+ objok.length + '- con Ids -' + objok +'- fueron agregados al carrito con éxito. ' })

       }
       catch (error) {
         res.status(400).json({ message: error.message })
       }

   

 });


router.get('/vauchers/:id/:vaucherid', async (req, res) => {

  const id = req.params.id;
  const vaucherid = req.params.vaucherid;
  let products =[]



  try {


      const dataclient = await User.findOne({where:{id: id}});

      if(dataclient == null){
        return res.status(400).json({
           error: "No se encuentran usuarios"
       })
     }


      const vaucherdataclient = {name:dataclient.name,email:dataclient.email}

      const data = await Cart.findAll({where:{clientId: id,vaucherid: vaucherid}});

      if(data == null){
          return res.status(400).json({
            error: "No se encuentran usuarios"
        })
      }

      let totalprice = 0;
      let datevaucher ='';

        for (const { productId, quantity, date } of data) {
                
                  const producto = await Products.findByPk(productId);

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

router.get('/vauchers/:id', async (req, res) => {

  const id = req.params.id;
  const vaucherid = req.params.vaucherid;
  let products =[]



  try {


      const dataclient = await User.findOne({where:{id: id}});
      const vaucherdataclient = {name:dataclient.name,email:dataclient.email}

      const data = await Cart.findAll({where:{clientId: id}});
      let totalprice = 0;
      let datevaucher ='';

        for (const { productId, quantity, date, vaucherid } of data) {
                
                  const producto = await Products.findByPk(productId);

                  if (producto) {
                     const productTotalPrice = producto.price * quantity;
                     totalprice += productTotalPrice;
                     datevaucher = date
                     products.push({name:producto.name,price:producto.price,quantity:quantity,vaucherid:vaucherid})
                  }
                
      
        }



      res.json({clientdata:vaucherdataclient,items:products,total:totalprice});
  }
  catch (error) {
      res.status(500).json({ message: error.message })
  }
});






 module.exports = router;