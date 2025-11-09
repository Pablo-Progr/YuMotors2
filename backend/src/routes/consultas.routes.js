const express = require('express');
const router = express.Router();
const { obtenerConsultas, eliminarConsulta,actualizarEstadoConsulta } = require('../controllers/consultas.controller');  

router.get('/', obtenerConsultas);
router.delete('/eliminar/:idConsulta', eliminarConsulta);
router.put('/estado', actualizarEstadoConsulta);

module.exports = router;