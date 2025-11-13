const db = require('../config/config');

// Controlador para buscar un vehículo por patente
const buscarVehiculoPorPatente = (req, res) => {
    const { patente } = req.params;
    const query = 'SELECT * FROM vehiculospostventa WHERE patente = ?';
    
    db.query(query, [patente], (error, results) => {
        if (error) {
            console.error('Error al buscar vehículo por patente:', error);
            return res.status(500).json({ error: 'Error al buscar vehículo' });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Vehículo no encontrado' });
        }
        
        res.json(results[0]);
    });
};

module.exports = {
    buscarVehiculoPorPatente,
};