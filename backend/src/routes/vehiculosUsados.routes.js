const express = require('express');
const router = express.Router();
const { traerVehiculosUsados, eliminarVehiculoUsado, editarVehiculoUsado, agregarVehiculoUsado } = require('../controllers/vehiculosUsados.controller.js');  

router.get('/', traerVehiculosUsados);
router.post('/agregar', agregarVehiculoUsado);
router.delete('/eliminar/:id', eliminarVehiculoUsado);
router.put('/editar/:id', editarVehiculoUsado);

module.exports = router;

