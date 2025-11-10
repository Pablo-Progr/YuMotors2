const express = require('express');
const router = express.Router();
const { obtenerVehPostventa, eliminarVehiculoPostventa, editarVehiculoPostventa } = require('../controllers/vehPosventa.controller');

router.get('/', obtenerVehPostventa);
router.delete('/eliminar/:id', eliminarVehiculoPostventa);
router.put('/editar/:id', editarVehiculoPostventa);

module.exports = router;