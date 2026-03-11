const express = require('express');
const router = express.Router();
const { loginUser, registerUser, verifyEmail } = require('../controllers/login.controllers');

// Ruta para login
router.post('/login', loginUser);

// Ruta para registro (envía email de verificación)
router.post('/register', registerUser);

// Ruta para activar cuenta via token de email
router.get('/verify-email/:token', verifyEmail);

module.exports = router;
