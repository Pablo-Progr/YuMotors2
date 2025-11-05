const db = require('../config/config');

// Obtener ventas por mes
const getVentasPorMes = (req, res) => {
  const query = `
    SELECT 
      YEAR(fecha_venta) as anio,
      MONTH(fecha_venta) as mes,
      COUNT(*) as total_ventas,
      SUM(total_venta) as monto_total
    FROM ventas
    WHERE fecha_venta >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
    GROUP BY YEAR(fecha_venta), MONTH(fecha_venta)
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
      SUM(dv.cantidad * dv.precio_al_momento) as ingresos_totales
    FROM detalle_ventas dv
    INNER JOIN accesorios a ON dv.id_accesorio = a.idAccesorio
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
      COUNT(DISTINCT v.id_venta) as total_ventas,
      SUM(v.total_venta) as ingresos_totales,
      AVG(v.total_venta) as ticket_promedio,
      SUM(dv.cantidad) as total_productos_vendidos
    FROM ventas v
    LEFT JOIN detalle_ventas dv ON v.id_venta = dv.id_venta
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
        WHEN MONTH(fecha_venta) = MONTH(CURRENT_DATE()) 
          AND YEAR(fecha_venta) = YEAR(CURRENT_DATE()) 
        THEN 'Mes Actual'
        ELSE 'Mes Anterior'
      END as periodo,
      COUNT(*) as total_ventas,
      SUM(total_venta) as monto_total
    FROM ventas
    WHERE fecha_venta >= DATE_SUB(CURRENT_DATE(), INTERVAL 2 MONTH)
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

module.exports = {
  getVentasPorMes,
  getProductosMasVendidos,
  getResumenGeneral,
  getComparativoMensual
};
