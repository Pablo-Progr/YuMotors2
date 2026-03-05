const express = require('express');
const router = express.Router();
const { 
    traerVehiculosUsados, 
    traerVehiculosDisponibles,
    eliminarVehiculoUsado, 
    editarVehiculoUsado, 
    agregarVehiculoUsado,
    cambiarEstadoVehiculo 
} = require('../controllers/vehiculosUsados.controller.js');  

// Rutas para el admin (todos los vehículos)
router.get('/', traerVehiculosUsados);
// Ruta para el catálogo público (solo disponibles)
router.get('/disponibles', traerVehiculosDisponibles);
router.post('/agregar', agregarVehiculoUsado);
router.delete('/eliminar/:id', eliminarVehiculoUsado);
router.put('/editar/:id', editarVehiculoUsado);
router.patch('/estado/:id', cambiarEstadoVehiculo);

module.exports = router;

