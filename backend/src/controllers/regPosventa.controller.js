const db = require('../config/config');

const getRegistros = (req, res) => {
      const { id } = req.params;
    const query = 'SELECT * FROM registropostventa WHERE idVehiculoPostVenta = ?';

    // validate id
    if (!id) {
      return res.status(400).json({ error: 'Missing id parameter' });
    }

  // pass parameters as array to match mysql placeholders
  db.query(query, [id] , (err, results) => {
    if (err) {
      console.error(`Error fetching registros for id=${id}:`, err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json(results);
  });
};

const updateRegistro = (req, res) => {
    const { id } = req.params;
    const { fecha, hora, kilometraje, tipoPostVent, descripcion, estado } = req.body;

    const query = `UPDATE registropostventa 
                   SET fecha = ?, hora = ?, kilometraje = ?, tipoPostVent = ?, descripcion = ?, estado = ?
                   WHERE idRegistroPostVenta = ?`;

    db.query(query, [fecha, hora, kilometraje, tipoPostVent, descripcion, estado, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar el registro postventa:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json({ message: 'Registro postventa actualizado exitosamente' });
    });
};

const createRegistro = (req, res) => {
    const { idVehiculoPostVenta, fecha, hora, kilometraje, tipoPostVent, descripcion, estado } = req.body;

    const query = `INSERT INTO registropostventa (idVehiculoPostVenta, fecha, hora, kilometraje, tipoPostVent, descripcion, estado)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [idVehiculoPostVenta, fecha, hora, kilometraje, tipoPostVent, descripcion, estado], (err, results) => {
        if (err) {
            console.error('Error al crear el registro postventa:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.status(201).json({ message: 'Registro postventa creado exitosamente', id: results.insertId });
    });
};

module.exports = {
    getRegistros,
    updateRegistro,
    createRegistro,
};
