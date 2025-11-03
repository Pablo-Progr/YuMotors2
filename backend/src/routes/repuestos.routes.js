const express = require('express');
const router = express.Router();
const { traerRepuestos, agregarRepuesto, eliminarRepuesto } = require('../controllers/repuestos.controller');

router.get('/repuestos', traerRepuestos);
router.post('/agregar', agregarRepuesto);
router.delete('/eliminar/:id', eliminarRepuesto);

module.exports = router;
    