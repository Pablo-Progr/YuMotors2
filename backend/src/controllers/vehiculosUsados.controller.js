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

const agregarVehiculoUsado = (req, res) => {
    const { marca, modelo, anio, kilometraje, descripcion, precio, imagen } = req.body;
    const query = 'INSERT INTO vehiculosUsados (marca, modelo, anio, kilometraje, descripcion, precio, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [marca, modelo, anio, kilometraje, descripcion, precio, imagen], (err, results) => {
        if (err) {
            console.error('Error adding vehiculo usado:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ id: results.insertId, marca, modelo, anio, kilometraje, descripcion, precio, imagen });
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
    const { marca, modelo, anio, kilometraje, descripcion, precio, imagen } = req.body;
    const query = 'UPDATE vehiculosUsados SET marca = ?, modelo = ?, anio = ?, kilometraje = ?, descripcion = ?, precio = ?, imagen = ? WHERE idVehiculoUsado = ?';
    db.query(query, [marca, modelo, anio, kilometraje, descripcion, precio, imagen, id], (err, results) => {
        if (err) {
            console.error('Error updating vehiculo usado:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json({ id, marca, modelo, anio, kilometraje, descripcion, precio, imagen });
    });
};

module.exports = {
    traerVehiculosUsados,
    agregarVehiculoUsado,
    eliminarVehiculoUsado,
    editarVehiculoUsado,
};  