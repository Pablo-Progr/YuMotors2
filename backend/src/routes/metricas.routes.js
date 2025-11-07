const express = require('express');
const router = express.Router();
const {
  getVentasPorMes,
  getProductosMasVendidos,
  getResumenGeneral,
  getComparativoMensual,
  // Repuestos
  getVentasRepuestosPorMes,
  getRepuestosMasVendidos,
  getResumenGeneralRepuestos,
  getComparativoMensualRepuestos
} = require('../controllers/metricas.controllers');

// ===== RUTAS DE ACCESORIOS =====
// Ruta para obtener ventas por mes (últimos 12 meses)
router.get('/ventas-por-mes', getVentasPorMes);

// Ruta para obtener productos más vendidos
router.get('/productos-mas-vendidos', getProductosMasVendidos);

// Ruta para obtener resumen general
router.get('/resumen-general', getResumenGeneral);

// Ruta para obtener comparativo mensual
router.get('/comparativo-mensual', getComparativoMensual);

// ===== RUTAS DE REPUESTOS =====
// Ruta para obtener ventas de repuestos por mes
router.get('/repuestos/ventas-por-mes', getVentasRepuestosPorMes);

// Ruta para obtener repuestos más vendidos
router.get('/repuestos/mas-vendidos', getRepuestosMasVendidos);

// Ruta para obtener resumen general de repuestos
router.get('/repuestos/resumen-general', getResumenGeneralRepuestos);

// Ruta para obtener comparativo mensual de repuestos
router.get('/repuestos/comparativo-mensual', getComparativoMensualRepuestos);

module.exports = router;
