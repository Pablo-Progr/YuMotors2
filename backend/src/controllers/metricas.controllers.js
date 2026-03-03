const db = require('../config/config');

// ========== METRICAS DE ACCESORIOS (carrito con estado=2) ==========

const getVentasPorMes = (req, res) => {
  const query = `
    SELECT 
      YEAR(c.fechaCreacion) as anio,
      MONTH(c.fechaCreacion) as mes,
      COUNT(DISTINCT c.idCarrito) as total_ventas,
      SUM(a.precio * ci.cantidad) as monto_total
    FROM carrito c
    JOIN carrito_items ci ON c.idCarrito = ci.idCarrito
    JOIN accesorios a ON ci.idProducto = a.idAccesorio
    WHERE c.estado = 2
      AND ci.tipoProducto = 'accesorio'
      AND c.fechaCreacion >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
    GROUP BY YEAR(c.fechaCreacion), MONTH(c.fechaCreacion)
    ORDER BY anio DESC, mes DESC
  `;
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error obteniendo ventas por mes:', error);
      return res.status(500).json({ success: false, message: 'Error al obtener las metricas de ventas' });
    }
    res.status(200).json({ success: true, data: results });
  });
};

const getProductosMasVendidos = (req, res) => {
  const query = `
    SELECT 
      a.idAccesorio,
      a.nombre,
      a.marca,
      a.imagen,
      a.descripcion,
      a.precio,
      SUM(ci.cantidad) as total_vendido,
      SUM(ci.cantidad * a.precio) as ingresos_totales
    FROM carrito_items ci
    JOIN accesorios a ON ci.idProducto = a.idAccesorio
    JOIN carrito c ON ci.idCarrito = c.idCarrito
    WHERE c.estado = 2
      AND ci.tipoProducto = 'accesorio'
    GROUP BY a.idAccesorio, a.nombre, a.marca, a.imagen, a.descripcion, a.precio
    ORDER BY total_vendido DESC
    LIMIT 10
  `;
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error obteniendo productos mas vendidos:', error);
      return res.status(500).json({ success: false, message: 'Error al obtener productos mas vendidos' });
    }
    res.status(200).json({ success: true, data: results });
  });
};

const getResumenGeneral = (req, res) => {
  const query = `
    SELECT 
      COUNT(DISTINCT c.idCarrito) as total_ventas,
      COALESCE(SUM(a.precio * ci.cantidad), 0) as ingresos_totales,
      COALESCE(SUM(a.precio * ci.cantidad) / NULLIF(COUNT(DISTINCT c.idCarrito), 0), 0) as ticket_promedio,
      COALESCE(SUM(ci.cantidad), 0) as total_productos_vendidos
    FROM carrito c
    JOIN carrito_items ci ON c.idCarrito = ci.idCarrito
    JOIN accesorios a ON ci.idProducto = a.idAccesorio
    WHERE c.estado = 2
      AND ci.tipoProducto = 'accesorio'
  `;
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error obteniendo resumen general:', error);
      return res.status(500).json({ success: false, message: 'Error al obtener el resumen general' });
    }
    res.status(200).json({ success: true, data: results[0] });
  });
};

const getComparativoMensual = (req, res) => {
  const query = `
    SELECT 
      CASE 
        WHEN MONTH(c.fechaCreacion) = MONTH(CURRENT_DATE())
          AND YEAR(c.fechaCreacion) = YEAR(CURRENT_DATE())
        THEN 'Mes Actual'
        ELSE 'Mes Anterior'
      END as periodo,
      COUNT(DISTINCT c.idCarrito) as total_ventas,
      SUM(a.precio * ci.cantidad) as monto_total
    FROM carrito c
    JOIN carrito_items ci ON c.idCarrito = ci.idCarrito
    JOIN accesorios a ON ci.idProducto = a.idAccesorio
    WHERE c.estado = 2
      AND ci.tipoProducto = 'accesorio'
      AND c.fechaCreacion >= DATE_SUB(CURRENT_DATE(), INTERVAL 2 MONTH)
    GROUP BY periodo
  `;
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error obteniendo comparativo mensual:', error);
      return res.status(500).json({ success: false, message: 'Error al obtener comparativo mensual' });
    }
    res.status(200).json({ success: true, data: results });
  });
};

// ========== METRICAS DE REPUESTOS (carrito con estado=2) ==========

const getVentasRepuestosPorMes = (req, res) => {
  const query = `
    SELECT 
      YEAR(c.fechaCreacion) as anio,
      MONTH(c.fechaCreacion) as mes,
      COUNT(DISTINCT c.idCarrito) as total_ventas,
      SUM(r.precio * ci.cantidad) as monto_total
    FROM carrito c
    JOIN carrito_items ci ON c.idCarrito = ci.idCarrito
    JOIN repuestos r ON ci.idProducto = r.idRepuesto
    WHERE c.estado = 2
      AND ci.tipoProducto = 'repuesto'
      AND c.fechaCreacion >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
    GROUP BY YEAR(c.fechaCreacion), MONTH(c.fechaCreacion)
    ORDER BY anio DESC, mes DESC
  `;
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error obteniendo ventas de repuestos por mes:', error);
      return res.status(500).json({ success: false, message: 'Error al obtener las metricas de ventas de repuestos' });
    }
    res.status(200).json({ success: true, data: results });
  });
};

const getRepuestosMasVendidos = (req, res) => {
  const query = `
    SELECT 
      r.idRepuesto,
      r.nombre,
      r.marca,
      SUM(ci.cantidad) as total_vendido,
      SUM(ci.cantidad * r.precio) as ingresos_totales
    FROM carrito_items ci
    JOIN repuestos r ON ci.idProducto = r.idRepuesto
    JOIN carrito c ON ci.idCarrito = c.idCarrito
    WHERE c.estado = 2
      AND ci.tipoProducto = 'repuesto'
    GROUP BY r.idRepuesto, r.nombre, r.marca
    ORDER BY total_vendido DESC
    LIMIT 10
  `;
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error obteniendo repuestos mas vendidos:', error);
      return res.status(500).json({ success: false, message: 'Error al obtener repuestos mas vendidos' });
    }
    res.status(200).json({ success: true, data: results });
  });
};

const getResumenGeneralRepuestos = (req, res) => {
  const query = `
    SELECT 
      COUNT(DISTINCT c.idCarrito) as total_ventas,
      COALESCE(SUM(r.precio * ci.cantidad), 0) as ingresos_totales,
      COALESCE(SUM(r.precio * ci.cantidad) / NULLIF(COUNT(DISTINCT c.idCarrito), 0), 0) as ticket_promedio,
      COALESCE(SUM(ci.cantidad), 0) as total_productos_vendidos
    FROM carrito c
    JOIN carrito_items ci ON c.idCarrito = ci.idCarrito
    JOIN repuestos r ON ci.idProducto = r.idRepuesto
    WHERE c.estado = 2
      AND ci.tipoProducto = 'repuesto'
  `;
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error obteniendo resumen general de repuestos:', error);
      return res.status(500).json({ success: false, message: 'Error al obtener el resumen general de repuestos' });
    }
    res.status(200).json({ success: true, data: results[0] });
  });
};

const getComparativoMensualRepuestos = (req, res) => {
  const query = `
    SELECT 
      CASE 
        WHEN MONTH(c.fechaCreacion) = MONTH(CURRENT_DATE())
          AND YEAR(c.fechaCreacion) = YEAR(CURRENT_DATE())
        THEN 'Mes Actual'
        ELSE 'Mes Anterior'
      END as periodo,
      COUNT(DISTINCT c.idCarrito) as total_ventas,
      SUM(r.precio * ci.cantidad) as monto_total
    FROM carrito c
    JOIN carrito_items ci ON c.idCarrito = ci.idCarrito
    JOIN repuestos r ON ci.idProducto = r.idRepuesto
    WHERE c.estado = 2
      AND ci.tipoProducto = 'repuesto'
      AND c.fechaCreacion >= DATE_SUB(CURRENT_DATE(), INTERVAL 2 MONTH)
    GROUP BY periodo
  `;
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error obteniendo comparativo mensual de repuestos:', error);
      return res.status(500).json({ success: false, message: 'Error al obtener comparativo mensual de repuestos' });
    }
    res.status(200).json({ success: true, data: results });
  });
};

module.exports = {
  getVentasPorMes,
  getProductosMasVendidos,
  getResumenGeneral,
  getComparativoMensual,
  getVentasRepuestosPorMes,
  getRepuestosMasVendidos,
  getResumenGeneralRepuestos,
  getComparativoMensualRepuestos
};
