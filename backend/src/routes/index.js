const express = require('express');

const loginRoutes = require('./login.routes');
const repuestosRoutes = require('./repuestos.routes');

const router = express.Router();


router.use('/admin', loginRoutes);
router.use('/repuestos', repuestosRoutes);

module.exports = router;