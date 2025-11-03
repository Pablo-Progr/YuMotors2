const express = require('express');
const router = express.Router();
const { traerAccesorios } = require('../controllers/accesorios.controller');  

router.get('/accesorios', traerAccesorios);

module.exports = router;