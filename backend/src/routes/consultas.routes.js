const express = require('express');
const router = express.Router();
const { obtenerConsultas, eliminarConsulta, actualizarEstadoConsulta, crearConsulta } = require('../controllers/consultas.controller');  

router.get('/', obtenerConsultas);
router.delete('/eliminar/:idConsulta', eliminarConsulta);
router.put('/estado', actualizarEstadoConsulta);
router.post('/crearConsulta', crearConsulta);

module.exports = router;