const db = require('../config/config');

// Controlador para obtener todos los vehiculos registrados en el servicio de posventa.
const obtenerVehPostventa = (req, res) => {
    const query = 'SELECT * FROM vehiculospostventa';
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener vehiculos posventa:', error);
            return res.status(500).json({ error: 'Error al vehiculos posventa' });
        }
        res.json(results);
    });
};

const eliminarVehiculoPostventa = (req, res) => {
    const { id } = req.params;

    // Eliminar registros relacionados en la tabla registropostventa
    const deleteRegistrosQuery = 'DELETE FROM registropostventa WHERE idVehiculoPostVenta = ?';
    db.query(deleteRegistrosQuery, [id], (err) => {
        if (err) {
            console.error('Error al eliminar los registros relacionados:', err);
            return res.status(500).json({ error: 'Error interno del servidor al eliminar registros relacionados' });
        }

        // Eliminar el vehículo después de eliminar los registros relacionados
        const deleteVehiculoQuery = 'DELETE FROM vehiculospostventa WHERE idVehiculoPostVenta = ?';
        db.query(deleteVehiculoQuery, [id], (err) => {
            if (err) {
                console.error('Error al eliminar el vehículo postventa:', err);
                return res.status(500).json({ error: 'Error interno del servidor al eliminar el vehículo' });
            }
            res.json({ message: 'Vehículo postventa y sus registros eliminados exitosamente' });
        });
    });
};

const editarVehiculoPostventa = (req, res) => {
    const { id } = req.params;
    const { patente, marca, modelo, anio, telefono, codigo } = req.body;
    const query = 'UPDATE vehiculospostventa SET patente = ?, marca = ?, modelo = ?, anio = ?, telefono = ?, codigo = ? WHERE idVehiculoPostVenta = ?';
    db.query(query, [patente, marca, modelo, anio, telefono, codigo, id], (err, results) => {
        if (err) {
            console.error('Error al editar el vehículo postventa:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json({ message: 'Vehículo postventa editado exitosamente' });
    });
};

module.exports = {
    obtenerVehPostventa,
    eliminarVehiculoPostventa,
    editarVehiculoPostventa,
};