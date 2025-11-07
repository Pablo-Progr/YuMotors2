const db = require('../config/config');

// Obtener ventas por mes
const getVentasPorMes = (req, res) => {
  const query = `
    SELECT 
      YEAR(fechaVenta) as anio,
      MONTH(fechaVenta) as mes,
      COUNT(*) as total_ventas,
      SUM(totalVenta) as monto_total
    FROM ventasAccesorios
    WHERE fechaVenta >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
    GROUP BY YEAR(fechaVenta), MONTH(fechaVenta)
    ORDER BY anio DESC, mes DESC
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error obteniendo ventas por mes:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener las métricas de ventas'
      });
    }

    res.status(200).json({
      success: true,
      data: results
    });
  });
};

// Obtener productos más vendidos
const getProductosMasVendidos = (req, res) => {
  const query = `
    SELECT 
      a.idAccesorio,
      a.nombre,
      a.marca,
      SUM(dv.cantidad) as total_vendido,
      SUM(dv.cantidad * dv.precioMomento) as ingresos_totales
    FROM detalleVentasAccesorios dv
    INNER JOIN accesorios a ON dv.idAccesorio = a.idAccesorio
    GROUP BY a.idAccesorio, a.nombre, a.marca
    ORDER BY total_vendido DESC
    LIMIT 10
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error obteniendo productos más vendidos:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener productos más vendidos'
      });
    }

    res.status(200).json({
      success: true,
      data: results
    });
  });
};

// Obtener resumen general
const getResumenGeneral = (req, res) => {
  const query = `
    SELECT 
      COUNT(DISTINCT v.idVenta) as total_ventas,
      SUM(v.totalVenta) as ingresos_totales,
      AVG(v.totalVenta) as ticket_promedio,
      SUM(dv.cantidad) as total_productos_vendidos
    FROM ventasAccesorios v
    LEFT JOIN detalleVentasAccesorios dv ON v.idVenta = dv.idVenta
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error obteniendo resumen general:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener el resumen general'
      });
    }

    res.status(200).json({
      success: true,
      data: results[0]
    });
  });
};

// Obtener ventas del mes actual vs mes anterior
const getComparativoMensual = (req, res) => {
  const query = `
    SELECT 
      CASE 
        WHEN MONTH(fechaVenta) = MONTH(CURRENT_DATE()) 
          AND YEAR(fechaVenta) = YEAR(CURRENT_DATE()) 
        THEN 'Mes Actual'
        ELSE 'Mes Anterior'
      END as periodo,
      COUNT(*) as total_ventas,
      SUM(totalVenta) as monto_total
    FROM ventasAccesorios
    WHERE fechaVenta >= DATE_SUB(CURRENT_DATE(), INTERVAL 2 MONTH)
    GROUP BY periodo
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error obteniendo comparativo mensual:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener comparativo mensual'
      });
    }

    res.status(200).json({
      success: true,
      data: results
    });
  });
};

// ========== MÉTRICAS DE REPUESTOS ==========

// Obtener ventas de repuestos por mes
const getVentasRepuestosPorMes = (req, res) => {
  const query = `
    SELECT 
      YEAR(fechaVenta) as anio,
      MONTH(fechaVenta) as mes,
      COUNT(*) as total_ventas,
      SUM(totalVenta) as monto_total
    FROM ventasRepuestos
    WHERE fechaVenta >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
    GROUP BY YEAR(fechaVenta), MONTH(fechaVenta)
    ORDER BY anio DESC, mes DESC
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error obteniendo ventas de repuestos por mes:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener las métricas de ventas de repuestos'
      });
    }

    res.status(200).json({
      success: true,
      data: results
    });
  });
};

// Obtener repuestos más vendidos
const getRepuestosMasVendidos = (req, res) => {
  const query = `
    SELECT 
      r.idRepuesto,
      r.nombre,
      r.marca,
      SUM(dv.cantidad) as total_vendido,
      SUM(dv.cantidad * dv.precioMomento) as ingresos_totales
    FROM detalleVentasRepuestos dv
    INNER JOIN repuestos r ON dv.idRepuesto = r.idRepuesto
    GROUP BY r.idRepuesto, r.nombre, r.marca
    ORDER BY total_vendido DESC
    LIMIT 10
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error obteniendo repuestos más vendidos:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener repuestos más vendidos'
      });
    }

    res.status(200).json({
      success: true,
      data: results
    });
  });
};

// Obtener resumen general de repuestos
const getResumenGeneralRepuestos = (req, res) => {
  const query = `
    SELECT 
      COUNT(DISTINCT v.idVenta) as total_ventas,
      SUM(v.totalVenta) as ingresos_totales,
      AVG(v.totalVenta) as ticket_promedio,
      SUM(dv.cantidad) as total_productos_vendidos
    FROM ventasRepuestos v
    LEFT JOIN detalleVentasRepuestos dv ON v.idVenta = dv.idVenta
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error obteniendo resumen general de repuestos:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener el resumen general de repuestos'
      });
    }

    res.status(200).json({
      success: true,
      data: results[0]
    });
  });
};

// Obtener comparativo mensual de repuestos
const getComparativoMensualRepuestos = (req, res) => {
  const query = `
    SELECT 
      CASE 
        WHEN MONTH(fechaVenta) = MONTH(CURRENT_DATE()) 
          AND YEAR(fechaVenta) = YEAR(CURRENT_DATE()) 
        THEN 'Mes Actual'
        ELSE 'Mes Anterior'
      END as periodo,
      COUNT(*) as total_ventas,
      SUM(totalVenta) as monto_total
    FROM ventasRepuestos
    WHERE fechaVenta >= DATE_SUB(CURRENT_DATE(), INTERVAL 2 MONTH)
    GROUP BY periodo
  `;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error obteniendo comparativo mensual de repuestos:', error);
      return res.status(500).json({
        success: false,
        message: 'Error al obtener comparativo mensual de repuestos'
      });
    }

    res.status(200).json({
      success: true,
      data: results
    });
  });
};

module.exports = {
  getVentasPorMes,
  getProductosMasVendidos,
  getResumenGeneral,
  getComparativoMensual,
  // Repuestos
  getVentasRepuestosPorMes,
  getRepuestosMasVendidos,
  getResumenGeneralRepuestos,
  getComparativoMensualRepuestos
};
