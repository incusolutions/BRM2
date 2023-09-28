const express = require('express');
const Products = require('../models/Products');
const router = express.Router();

async function actualizarRegistro(id, nuevosDatos) {
    try {
      // Encuentra el registro que deseas actualizar
      const registro = await Products.findByPk(id);
  
      if (!registro) {
        // Manejar el caso en el que el registro no se encuentra
        return null;
      }
  
      // Realiza la actualización con los nuevos datos
      await registro.update(nuevosDatos);
  
      // Devuelve el registro actualizado
      return registro;
    } catch (error) {
      // Manejar errores
      console.error('Error al actualizar el registro:', error);
      throw error;
    }
}
  

router.get('/', async (req, res) => {
    try {
        const data = await Products.findAll();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});


 router.post('/register', async (req, res) => {

    let { lotNumber, name, price, quantity, entryDate } = req.body;

    if(!lotNumber||!name||!price||!quantity||!entryDate){
        return res.status(400).json({
            error: "uno o mas campos vacios"
        })
    }

    try {
  
        const data = await Products.create({lotNumber, name, price, quantity,entryDate})
        res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

   

 });

 router.put('/edit/:id', async (req, res) => {

    const id = req.params.id;
    const nuevosDatos = req.body;
  

    let { lotNumber, name, price, quantity, entryDate } = req.body;

    console.log(id);
    console.log(req.params.id);

    try {
        const registroActualizado = await actualizarRegistro(id, nuevosDatos);
    
        if (registroActualizado) {
          res.status(200).json({ message: 'Registro actualizado con éxito', data: registroActualizado });
        } else {
          res.status(404).json({ message: 'Registro no encontrado' });
        }
      } catch (error) {
        res.status(500).json({ message: 'Error en la actualización' });
    }

   

 });

router.delete('/delete/:id', async (req, res) => {

    const id = req.params.id;
    const nuevosDatos = req.body;

    console.log(id);
  
    try {
        const data = await Products.destroy({ where: {id:id }});
         if (data) {
            res.status(200).json({message: 'Registro eliminado con éxito' });
          } else {
            res.status(404).json({ message: 'Registro no encontrado' });
          }
    } catch (error) {
        res.status(500).json({ message: 'Error en la actualización' });
    }

   

 });




 module.exports = router;