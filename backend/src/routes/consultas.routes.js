const express = require('express');
const router = express.Router();
const { obtenerConsultas } = require('../controllers/consultas.controller');  

router.get('/consultas', obtenerConsultas);

module.exports = router;