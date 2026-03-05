const db = require('../config/config.js');

const traerVehiculosUsados = (req, res) => {
    const query = 'SELECT * FROM vehiculosUsados';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching vehiculos usados:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
};

// Traer solo vehículos disponibles (estado = 0) para el catálogo público
const traerVehiculosDisponibles = (req, res) => {
    const query = 'SELECT * FROM vehiculosUsados WHERE estado = 0';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching vehiculos disponibles:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
};

const agregarVehiculoUsado = (req, res) => {
    const { marca, modelo, anio, kilometraje, descripcion, precio, imagen } = req.body;
    const estado = 0; // Por defecto: Disponible
    const query = 'INSERT INTO vehiculosUsados (marca, modelo, anio, kilometraje, descripcion, precio, imagen, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [marca, modelo, anio, kilometraje, descripcion, precio, imagen, estado], (err, results) => {
        if (err) {
            console.error('Error adding vehiculo usado:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ id: results.insertId, marca, modelo, anio, kilometraje, descripcion, precio, imagen, estado });
    });
};

const eliminarVehiculoUsado = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM vehiculosUsados WHERE idVehiculoUsado = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting vehiculo usado:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(204).send();
    });
};

const editarVehiculoUsado = (req, res) => {
    const { id } = req.params;
    const { marca, modelo, anio, kilometraje, descripcion, precio, imagen, estado } = req.body;
    const query = 'UPDATE vehiculosUsados SET marca = ?, modelo = ?, anio = ?, kilometraje = ?, descripcion = ?, precio = ?, imagen = ?, estado = ? WHERE idVehiculoUsado = ?';
    db.query(query, [marca, modelo, anio, kilometraje, descripcion, precio, imagen, estado, id], (err, results) => {
        if (err) {
            console.error('Error updating vehiculo usado:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json({ id, marca, modelo, anio, kilometraje, descripcion, precio, imagen, estado });
    });
};

// Cambiar solo el estado de un vehículo
const cambiarEstadoVehiculo = (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    
    if (estado === undefined || ![0, 1, 2].includes(parseInt(estado))) {
        return res.status(400).json({ error: 'Estado inválido. Debe ser 0 (Disponible), 1 (Reservado) o 2 (Vendido)' });
    }
    
    const query = 'UPDATE vehiculosUsados SET estado = ? WHERE idVehiculoUsado = ?';
    db.query(query, [estado, id], (err, results) => {
        if (err) {
            console.error('Error updating vehicle status:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Vehículo no encontrado' });
        }
        res.json({ id, estado, message: 'Estado actualizado correctamente' });
    });
};

module.exports = {
    traerVehiculosUsados,
    traerVehiculosDisponibles,
    agregarVehiculoUsado,
    eliminarVehiculoUsado,
    editarVehiculoUsado,
    cambiarEstadoVehiculo,
};  