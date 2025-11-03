const express = require('express');

const loginRoutes = require('./login.routes');
const repuestosRoutes = require('./repuestos.routes');
const accesoriosRoutes = require('./accesorios.routes');
const consultasRoutes = require('./consultas.routes');

const router = express.Router();


router.use('/admin', loginRoutes);
router.use('/repuestos', repuestosRoutes);
router.use('/accesorios', accesoriosRoutes);
router.use('/consultas', consultasRoutes);

module.exports = router;