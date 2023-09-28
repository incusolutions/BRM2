const express = require('express');
const User = require('../models/User');
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const secretKey = process.env.SECRET_KEY;

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

 router.get('/', async (req, res) => {
    try {
        const data = await User.findAll();
        console.log(data);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
 });

 router.post('/register', async (req, res) => {

    let { name, email, password, role } = req.body;
    if(!name||!email||!password||!role){
        return res.status(400).json({
            error: "uno o mas campos vacios"
        })
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          // Manejar el error, por ejemplo, enviar una respuesta de error
          return res.status(500).json({ error: 'Error al registrar al usuario.' });
        }

        console.log(hash);

        password = hash;

        const data = await User.create({name, email, password, role})
        res.json(data);
    });

 

   

 });

 router.post('/login', async (req, res) => {
    
    const { email, password } = req.body;
    let token;

    if(!email||!password){
        return res.status(400).json({
            error: "uno o mas campos vacios"
        })
    }

    try {
        const data = await User.findOne({where:{ email:email }});

      
        if(data == null){
            return res.status(400).json({
                error: "No existe usuario"
            })
        }

        console.log(data.password);
        console.log(password);
        bcrypt.compare(password, data.password, (err, result) => {
            if (err) {
                // Manejar el error
                return res.status(500).json({ error: 'Error al comparar contraseñas.' });
            }

            console.log(result);
            console.log(data);
            if (result) {

                if(data.role==='admin'){
                    const userData = data.toJSON();
                    token = jwt.sign(userData, secretKey, { expiresIn: '1h' }); // Ejemplo de tiempo de expiración de 1 hora
                    console.log('Token generado:', token);

                    const copiedData = { ...data }; 
                    let cleandata = copiedData.dataValues
                    cleandata.token = token;

                    res.json(cleandata)
                }
                else if(data.role==='client'){
                    res.json(data)
                }
              
                
              
        
              //  res.json({ message: 'Inicio de sesión exitoso', token });
              } else {
                // Contraseña incorrecta
                res.status(401).json({ error: 'Contraseña incorrecta.' });
              }
            
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
    

 });


 module.exports = router;