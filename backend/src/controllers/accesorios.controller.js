const db = require('../config/config');

// Controlador para obtener todos los accesorios
const traerAccesorios = (req, res) => {
    const query = 'SELECT * FROM accesorios';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching accesorios:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }  
        res.json(results);
    });
};

const eliminarAccesorio = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM accesorios WHERE idAccesorio = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error deleting accesorio:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json({ message: 'Accesorio eliminado exitosamente' });
    });
};

const crearAccesorio = (req, res) => {
    const { nombre, marca, descripcion, precio, stock } = req.body;
    const query = 'INSERT INTO accesorios (nombre, marca, descripcion, precio, stock) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nombre, marca, descripcion, precio, stock], (err, results) => {
        if (err) {
            console.error('Error creating accesorio:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'Accesorio creado exitosamente', id: results.insertId });
    });
};

const editarAccesorio = (req, res) => {
    const { id } = req.params;
    const { nombre, marca, descripcion, precio, stock } = req.body;
    const query = 'UPDATE accesorios SET nombre = ?, marca = ?, descripcion = ?, precio = ?, stock = ? WHERE idAccesorio = ?';
    db.query(query, [nombre, marca, descripcion, precio, stock, id], (err, results) => {
        if (err) {
            console.error('Error editing accesorio:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json({ message: 'Accesorio editado exitosamente' });
    });
};

module.exports = {
    traerAccesorios,
    eliminarAccesorio,
    crearAccesorio,
    editarAccesorio,
};