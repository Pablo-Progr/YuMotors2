const express = require('express');
const router = express.Router();
const { traerAccesorios, eliminarAccesorio, crearAccesorio,editarAccesorio } = require('../controllers/accesorios.controller');  

router.get('/accesorios', traerAccesorios);
router.delete('/eliminar/:id', eliminarAccesorio);
router.post('/crear', crearAccesorio);
router.put('/editar/:id', editarAccesorio);

module.exports = router;