const db = require('../config/config');

const traerRepuestos = (req, res) => {
  const query = 'SELECT * FROM repuestos';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching repuestos:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
};

const agregarRepuesto = (req, res) => {
  const { nombre, marca, numeroParte, descripcion, precio, stock } = req.body;
  const query = 'INSERT INTO repuestos (nombre, marca, numeroParte, descripcion, precio, stock) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [nombre, marca, numeroParte, descripcion, precio, stock], (err, results) => {
    if (err) {
      console.error('Error adding repuesto:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(201).json({ id: results.insertId, nombre, marca, numeroParte, descripcion, precio, stock });
  });
};

const eliminarRepuesto = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM repuestos WHERE idRepuesto = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting repuesto:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(204).send();
  });
};

const editarRepuesto = (req, res) => {
  const { id } = req.params;
  const { nombre, marca, numeroParte, descripcion, precio, stock } = req.body;

  const query = 'UPDATE repuestos SET nombre = ?, marca = ?, numeroParte = ?, descripcion = ?, precio = ?, stock = ? WHERE idRepuesto = ?';
  db.query(query, [nombre, marca, numeroParte, descripcion, precio, stock, id], (err, results) => {
    if (err) {
      console.error('Error updating repuesto:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ id, nombre, marca, numeroParte, descripcion, precio, stock });
  });
};

module.exports = {
  traerRepuestos,
  agregarRepuesto,
  eliminarRepuesto,
  editarRepuesto,
};