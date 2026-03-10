const express = require('express');
const router = express.Router();
const { getRegistros, updateRegistro, createRegistro, getHorariosOcupados, verificarDisponibilidad } = require('../controllers/regPosventa.controller');

router.get('/horarios-ocupados/:fecha', getHorariosOcupados);
router.get('/verificar-disponibilidad', verificarDisponibilidad);
router.get('/:id', getRegistros);
router.put('/editar/:id', updateRegistro);
router.post('/crear', createRegistro);

module.exports = router;