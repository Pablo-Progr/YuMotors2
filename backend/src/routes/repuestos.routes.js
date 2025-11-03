const express = require('express');
const router = express.Router();
const { traerRepuestos } = require('../controllers/repuestos.controller');

router.get('/repuestos', traerRepuestos);

module.exports = router;
