const express = require('express');

const loginRoutes = require('./login.routes');
const passwordRecoveryRoutes = require('./passwordRecovery.routes');
const repuestosRoutes = require('./repuestos.routes');
const accesoriosRoutes = require('./accesorios.routes');
const consultasRoutes = require('./consultas.routes');
const metricasRoutes = require('./metricas.routes');
const vehiculosUsadosRoutes = require('./vehiculosUsados.routes');
const vehPosventaRoutes = require('./vehPosventa.routes');
const regPosventaRoutes = require('./regPosventa.routes');
const regPosventaUserRoutes = require('./regPosventaUser.routes');
const carritoRoutes = require('./carrito.routes');

const router = express.Router();


router.use('/admin', loginRoutes);
router.use('/password-recovery', passwordRecoveryRoutes);
router.use('/repuestos', repuestosRoutes);
router.use('/accesorios', accesoriosRoutes);
router.use('/consultas', consultasRoutes);
router.use('/metricas', metricasRoutes);
router.use('/vehiculos-usados', vehiculosUsadosRoutes);
router.use('/veh-posventa', vehPosventaRoutes);
router.use('/reg-posventa', regPosventaRoutes);
router.use('/reg-posventa-user', regPosventaUserRoutes);
router.use('/carrito', carritoRoutes);
module.exports = router;