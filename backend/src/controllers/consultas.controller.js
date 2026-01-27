const db = require('../config/config');

// Controlador para obtener todas las consultas
const obtenerConsultas = (req, res) => {
    const query = 'SELECT * FROM consultas ORDER BY idConsulta DESC';
    db.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener consultas:', error);
            return res.status(500).json({ error: 'Error al obtener consultas' });
        }
        res.json(results);
    });
};

const actualizarEstadoConsulta = (req, res) => {
    const { idConsulta, estado } = req.body;
    const query = 'UPDATE consultas SET estado = ? WHERE idConsulta = ?';
    db.query(query, [estado, idConsulta], (error, results) => {
        if (error) {
            console.error('Error al actualizar estado de consulta:', error);
            return res.status(500).json({ error: 'Error al actualizar estado de consulta' });
        }
        res.json({ message: 'Estado de consulta actualizado correctamente' });
    });
};

const eliminarConsulta = (req, res) => {
    const { idConsulta } = req.params;
    const query = 'DELETE FROM consultas WHERE idConsulta = ?';
    db.query(query, [idConsulta], (error, results) => {
        if (error) {
            console.error('Error al eliminar consulta:', error);
            return res.status(500).json({ error: 'Error al eliminar consulta' });
        }
        res.json({ message: 'Consulta eliminada correctamente' });
    });
};

const crearConsulta = (req, res) => {
    const { nombre, email, telefono, asunto, mensaje, preferencia  } = req.body;
    const query = 'INSERT INTO consultas (nombre, email, telefono, asunto, mensaje, preferencia, estado) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [nombre, email, telefono, asunto, mensaje, preferencia, 0], (error, results) => {
        if (error) {
            console.error('Error al crear consulta:', error);
            return res.status(500).json({ error: 'Error al crear consulta' });
        }   
        res.status(201).json({ message: 'Consulta creada correctamente' });
    }   
    );
};





module.exports = {
    obtenerConsultas,
    actualizarEstadoConsulta,
    eliminarConsulta,
    crearConsulta
};