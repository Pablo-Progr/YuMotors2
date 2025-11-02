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

module.exports = {
  traerRepuestos,
};