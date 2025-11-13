const express = require('express');
const router = express.Router();
const { obtenerVehPostventa, eliminarVehiculoPostventa, editarVehiculoPostventa, crearVehiculoPostventa } = require('../controllers/vehPosventa.controller');

router.get('/', obtenerVehPostventa);
router.post('/crear', crearVehiculoPostventa);
router.delete('/eliminar/:id', eliminarVehiculoPostventa);
router.put('/editar/:id', editarVehiculoPostventa);

module.exports = router;