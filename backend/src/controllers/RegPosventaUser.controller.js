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

module.exports = {
    getRegistros,
};
