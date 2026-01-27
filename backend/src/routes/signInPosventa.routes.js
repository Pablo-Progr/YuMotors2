const express = require('express');
const router = express.Router();
const { buscarVehiculoPorPatente } = require('../controllers/signInPosventa.controller');

router.get('/patente/:patente', buscarVehiculoPorPatente);

module.exports = router;