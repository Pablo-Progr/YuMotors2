const db = require('../config/config');

// Controlador para obtener todas las consultas
const obtenerConsultas = (req, res) => {
    const query = 'SELECT * FROM consultas';
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener consultas:', error);
            return res.status(500).json({ error: 'Error al obtener consultas' });
        }
        res.json(results);
    });
};

module.exports = {
    obtenerConsultas,
};