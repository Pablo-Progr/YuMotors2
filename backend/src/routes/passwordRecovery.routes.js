const express = require('express');
const router = express.Router();
const { 
  solicitarRecuperacion, 
  verificarToken, 
  resetearPassword 
} = require('../controllers/passwordRecovery.controller');

// Ruta para solicitar recuperación de contraseña
router.post('/request', solicitarRecuperacion);

// Ruta para verificar si un token es válido
router.get('/verify/:token', verificarToken);

// Ruta para resetear la contraseña
router.post('/reset/:token', resetearPassword);

module.exports = router;
