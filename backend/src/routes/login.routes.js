const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require('../controllers/login.controllers');

// Ruta para login
router.post('/login', loginUser);

// Ruta para registro (opcional)
router.post('/register', registerUser);

module.exports = router;
