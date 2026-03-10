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

// Obtener vehículos por idUsuario
const obtenerVehiculosPorUsuario = (req, res) => {
    const { idUsuario } = req.params;

    if (!idUsuario) {
        return res.status(400).json({ error: 'Se requiere el ID del usuario' });
    }

    const query = 'SELECT * FROM vehiculospostventa WHERE idUsuario = ?';
    db.query(query, [idUsuario], (error, results) => {
        if (error) {
            console.error('Error al obtener vehículos del usuario:', error);
            return res.status(500).json({ error: 'Error al obtener vehículos del usuario' });
        }
        res.json(results);
    });
};

// Obtener un vehículo específico por ID
const obtenerVehiculoPorId = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Se requiere el ID del vehículo' });
    }

    const query = 'SELECT * FROM vehiculospostventa WHERE idVehiculoPostVenta = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            console.error('Error al obtener vehículo:', error);
            return res.status(500).json({ error: 'Error al obtener vehículo' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Vehículo no encontrado' });
        }
        res.json(results[0]);
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

const crearVehiculoPostventa = (req, res) => {
    const { patente, marca, modelo, anio, telefono, codigo, idUsuario } = req.body;
    
    console.log('=== DEBUG CREAR VEHICULO ===');
    console.log('Body recibido:', req.body);
    console.log('idUsuario recibido:', idUsuario);
    
    const query = 'INSERT INTO vehiculospostventa (patente, marca, modelo, anio, telefono, codigo, idUsuario) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [patente, marca, modelo, anio, telefono, codigo, idUsuario], (err, results) => {
        if (err) {
            console.error('Error al crear el vehículo postventa:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        console.log('Vehículo creado con ID:', results.insertId);
        res.status(201).json({ message: 'Vehículo postventa creado exitosamente', id: results.insertId, codigo });
    });
};

module.exports = {
    obtenerVehPostventa,
    obtenerVehiculosPorUsuario,
    obtenerVehiculoPorId,
    eliminarVehiculoPostventa,
    editarVehiculoPostventa,
    crearVehiculoPostventa,
};