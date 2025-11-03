const express = require('express');
const router = express.Router();
const { traerRepuestos, agregarRepuesto } = require('../controllers/repuestos.controller');

router.get('/repuestos', traerRepuestos);
router.post('/agregar', agregarRepuesto);

module.exports = router;
    