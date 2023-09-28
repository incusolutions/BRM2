const express = require('express');
const router = express.Router();

// router.get('/', async (req, res) => {
//     try {
//         const data = await modelTournament.find();
//         res.json(data)
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// });

 router.get('/', async (req, res) => {
    res.json({
        msg: "holamundoooo"
    })
 });

 module.exports = router;