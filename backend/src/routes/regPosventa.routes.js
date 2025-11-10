const express = require('express');
const router = express.Router();
const { getRegistros, updateRegistro, createRegistro } = require('../controllers/regPosventa.controller');

router.get('/:id', getRegistros);
router.put('/editar/:id', updateRegistro);
router.post('/crear', createRegistro);

module.exports = router;