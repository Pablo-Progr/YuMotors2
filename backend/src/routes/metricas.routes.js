const express = require('express');
const router = express.Router();
const {
  getVentasPorMes,
  getProductosMasVendidos,
  getResumenGeneral,
  getComparativoMensual
} = require('../controllers/metricas.controllers');

// Ruta para obtener ventas por mes (últimos 12 meses)
router.get('/ventas-por-mes', getVentasPorMes);

// Ruta para obtener productos más vendidos
router.get('/productos-mas-vendidos', getProductosMasVendidos);

// Ruta para obtener resumen general
router.get('/resumen-general', getResumenGeneral);

// Ruta para obtener comparativo mensual
router.get('/comparativo-mensual', getComparativoMensual);

module.exports = router;
