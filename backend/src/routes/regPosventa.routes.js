const express = require('express');
const router = express.Router();
const { getRegistros, updateRegistro, updateRegistroAdmin, createRegistro, getHorariosOcupados, verificarDisponibilidad, getRegistroById, getTurnoActivo, cancelarTurno } = require('../controllers/regPosventa.controller');

router.get('/horarios-ocupados/:fecha', getHorariosOcupados);
router.get('/verificar-disponibilidad', verificarDisponibilidad);
router.get('/turno-activo/:idVehiculo', getTurnoActivo);
router.get('/registro/:id', getRegistroById);
router.put('/cancelar/:id', cancelarTurno);
router.put('/admin-editar/:id', updateRegistroAdmin);
router.get('/:id', getRegistros);
router.put('/editar/:id', updateRegistro);
router.post('/crear', createRegistro);

module.exports = router;