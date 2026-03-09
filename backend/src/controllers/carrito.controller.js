const db = require('../config/config');

// Confirmar pedido: crea carrito + items
const confirmarPedido = (req, res) => {
  const { idUsuario, items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'El carrito está vacío' });
  }

  // Crear el carrito
  const queryCarrito = 'INSERT INTO carrito (idUsuario) VALUES (?)';
  db.query(queryCarrito, [idUsuario || null], (err, result) => {
    if (err) {
      console.error('Error creando carrito:', err);
      return res.status(500).json({ error: 'Error al crear el pedido' });
    }

    const idCarrito = result.insertId;

    // Insertar los items del carrito
    const queryItems = 'INSERT INTO carrito_items (idCarrito, tipoProducto, idProducto, cantidad) VALUES ?';
    const values = items.map(item => [
      idCarrito,
      item.tipoProducto,
      item.idProducto,
      item.cantidad
    ]);

    db.query(queryItems, [values], (err2) => {
      if (err2) {
        console.error('Error insertando items:', err2);
        return res.status(500).json({ error: 'Error al guardar los productos del pedido' });
      }

      res.status(201).json({
        success: true,
        message: 'Pedido confirmado exitosamente',
        idCarrito
      });
    });
  });
};

// Obtener pedidos de un usuario
const obtenerPedidos = (req, res) => {
  const { idUsuario } = req.params;
  const query = `
    SELECT idCarrito, estado, fechaCreacion
    FROM carrito
    WHERE idUsuario = ?
    ORDER BY fechaCreacion DESC
  `;

  db.query(query, [idUsuario], (err, results) => {
    if (err) {
      console.error('Error obteniendo pedidos:', err);
      return res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
    res.json(results);
  });
};

// Eliminar un pedido (solo si no está retirado)
const eliminarPedido = (req, res) => {
  const { idCarrito } = req.params;

  // Verificar que el pedido existe y no está retirado (estado 2)
  db.query('SELECT estado FROM carrito WHERE idCarrito = ?', [idCarrito], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al verificar el pedido' });
    if (rows.length === 0) return res.status(404).json({ error: 'Pedido no encontrado' });
    if (rows[0].estado === 2) return res.status(400).json({ error: 'No se puede eliminar un pedido ya retirado' });

    // Borrar items primero (FK), luego el carrito
    db.query('DELETE FROM carrito_items WHERE idCarrito = ?', [idCarrito], (err) => {
      if (err) return res.status(500).json({ error: 'Error al eliminar los items del pedido' });

      db.query('DELETE FROM carrito WHERE idCarrito = ?', [idCarrito], (err) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar el pedido' });
        res.json({ success: true, message: 'Pedido eliminado correctamente' });
      });
    });
  });
};

// Obtener detalle de un pedido específico
const obtenerDetallePedido = (req, res) => {
  const { idCarrito } = req.params;
  const query = `
    SELECT ci.idItem, ci.tipoProducto, ci.idProducto, ci.cantidad,
           CASE 
             WHEN ci.tipoProducto = 'repuesto' THEN r.nombre
             WHEN ci.tipoProducto = 'accesorio' THEN a.nombre
           END as nombre,
           CASE 
             WHEN ci.tipoProducto = 'repuesto' THEN r.precio
             WHEN ci.tipoProducto = 'accesorio' THEN a.precio
           END as precio,
           CASE 
             WHEN ci.tipoProducto = 'repuesto' THEN r.imagen
             WHEN ci.tipoProducto = 'accesorio' THEN a.imagen
           END as imagen
    FROM carrito_items ci
    LEFT JOIN repuestos r ON ci.tipoProducto = 'repuesto' AND ci.idProducto = r.idRepuesto
    LEFT JOIN accesorios a ON ci.tipoProducto = 'accesorio' AND ci.idProducto = a.idAccesorio
    WHERE ci.idCarrito = ?
  `;

  db.query(query, [idCarrito], (err, results) => {
    if (err) {
      console.error('Error obteniendo detalle:', err);
      return res.status(500).json({ error: 'Error al obtener el detalle del pedido' });
    }
    res.json(results);
  });
};

// Obtener todos los pedidos (admin)
const obtenerTodosPedidos = (req, res) => {
  const query = `
    SELECT c.idCarrito, c.estado, c.fechaCreacion,
           u.nombre, u.mail
    FROM carrito c
    JOIN usuarios u ON c.idUsuario = u.idUsuario
    ORDER BY c.fechaCreacion DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error obteniendo todos los pedidos:', err);
      return res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
    res.json(results);
  });
};

// Actualizar estado de un pedido (admin)
const actualizarEstadoPedido = (req, res) => {
  const { idCarrito } = req.params;
  const { estado } = req.body;

  if (estado === undefined || estado === null) {
    return res.status(400).json({ error: 'El estado es requerido' });
  }

  // Si el estado es 2 (retirado), actualizar stock
  if (parseInt(estado) === 2) {
    // Primero obtener todos los items del carrito
    const queryItems = `
      SELECT ci.tipoProducto, ci.idProducto, ci.cantidad
      FROM carrito_items ci
      WHERE ci.idCarrito = ?
    `;

    db.query(queryItems, [idCarrito], (err, items) => {
      if (err) {
        console.error('Error obteniendo items del carrito:', err);
        return res.status(500).json({ error: 'Error al obtener los items del pedido' });
      }

      // Actualizar stock para cada item
      let completedUpdates = 0;
      const totalUpdates = items.length;

      if (totalUpdates === 0) {
        // Si no hay items, solo actualizar el estado
        return actualizarEstado();
      }

      items.forEach(item => {
        let updateQuery, tableName, idField;

        if (item.tipoProducto === 'accesorio') {
          tableName = 'accesorios';
          idField = 'idAccesorio';
        } else if (item.tipoProducto === 'repuesto') {
          tableName = 'repuestos';
          idField = 'idRepuesto';
        } else {
          completedUpdates++;
          if (completedUpdates === totalUpdates) {
            actualizarEstado();
          }
          return;
        }

        updateQuery = `UPDATE ${tableName} SET stock = stock - ? WHERE ${idField} = ? AND stock >= ?`;

        db.query(updateQuery, [item.cantidad, item.idProducto, item.cantidad], (err, result) => {
          if (err) {
            console.error(`Error actualizando stock de ${item.tipoProducto}:`, err);
          }

          if (result && result.affectedRows === 0) {
            console.warn(`Stock insuficiente para ${item.tipoProducto} ID ${item.idProducto}`);
          }

          completedUpdates++;
          if (completedUpdates === totalUpdates) {
            actualizarEstado();
          }
        });
      });
    });
  } else {
    // Si el estado no es 2, solo actualizar el estado
    actualizarEstado();
  }

  function actualizarEstado() {
    db.query('UPDATE carrito SET estado = ? WHERE idCarrito = ?', [estado, idCarrito], (err) => {
      if (err) {
        console.error('Error actualizando estado:', err);
        return res.status(500).json({ error: 'Error al actualizar el estado' });
      }
      res.json({ success: true, message: 'Estado actualizado correctamente' });
    });
  }
};

module.exports = {
  confirmarPedido,
  obtenerPedidos,
  obtenerDetallePedido,
  obtenerTodosPedidos,
  actualizarEstadoPedido,
  eliminarPedido,
};

