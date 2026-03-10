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

const updateRegistro = (req, res) => {
    const { id } = req.params;
    const { fecha, hora, kilometraje, tipoPostVent, descripcion, estado } = req.body;

    const query = `UPDATE registropostventa 
                   SET fecha = ?, hora = ?, kilometraje = ?, tipoPostVent = ?, descripcion = ?, estado = ?
                   WHERE idRegistroPostVenta = ?`;

    db.query(query, [fecha, hora, kilometraje, tipoPostVent, descripcion, estado, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar el registro postventa:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json({ message: 'Registro postventa actualizado exitosamente' });
    });
};

const createRegistro = (req, res) => {
    const { idVehiculoPostVenta, fecha, hora, kilometraje, tipoPostVent, descripcion, estado } = req.body;

    // Normalizar hora a formato HH:MM:00 para comparación consistente
    const horaCorta = hora.substring(0, 5); // "08:00"
    const horaCompleta = `${horaCorta}:00`; // "08:00:00"

    console.log('=== DEBUG TURNO ===');
    console.log('Fecha recibida:', fecha);
    console.log('Hora recibida:', hora);
    console.log('Hora corta:', horaCorta);
    console.log('Hora completa:', horaCompleta);

    // Primero verificar si el turno ya está ocupado
    const checkQuery = `SELECT * FROM registropostventa WHERE fecha = ? AND hora = ?`;
    
    db.query(checkQuery, [fecha, horaCompleta], (checkErr, checkResults) => {
        if (checkErr) {
            console.error('Error al verificar disponibilidad:', checkErr);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        console.log('Resultados encontrados:', checkResults.length);
        console.log('Registros:', checkResults);

        if (checkResults.length > 0) {
            console.log('TURNO OCUPADO - Rechazando solicitud');
            return res.status(409).json({ error: 'El turno seleccionado ya está ocupado. Por favor, elija otro horario.' });
        }

        console.log('TURNO DISPONIBLE - Creando registro');
        
        // Si el turno está disponible, crear el registro
        const query = `INSERT INTO registropostventa (idVehiculoPostVenta, fecha, hora, kilometraje, tipoPostVent, descripcion, estado)
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;

        db.query(query, [idVehiculoPostVenta, fecha, horaCompleta, kilometraje, tipoPostVent, descripcion, estado], (err, results) => {
            if (err) {
                console.error('Error al crear el registro postventa:', err);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
            console.log('Registro creado con ID:', results.insertId);
            res.status(201).json({ message: 'Registro postventa creado exitosamente', id: results.insertId });
        });
    });
};

// Obtener horarios ocupados para una fecha específica
const getHorariosOcupados = (req, res) => {
    const { fecha } = req.params;

    if (!fecha) {
        return res.status(400).json({ error: 'Fecha requerida' });
    }

    const query = `SELECT SUBSTRING(hora, 1, 5) as hora FROM registropostventa WHERE fecha = ?`;
    
    db.query(query, [fecha], (err, results) => {
        if (err) {
            console.error('Error al obtener horarios ocupados:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        const horariosOcupados = results.map(r => r.hora);
        res.json({ horariosOcupados });
    });
};

// Verificar disponibilidad de un turno específico
const verificarDisponibilidad = (req, res) => {
    const { fecha, hora } = req.query;

    if (!fecha || !hora) {
        return res.status(400).json({ error: 'Fecha y hora requeridas' });
    }

    const query = `SELECT COUNT(*) as count FROM registropostventa WHERE fecha = ? AND hora = ?`;
    
    db.query(query, [fecha, hora], (err, results) => {
        if (err) {
            console.error('Error al verificar disponibilidad:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        const disponible = results[0].count === 0;
        res.json({ disponible });
    });
};

module.exports = {
    getRegistros,
    updateRegistro,
    createRegistro,
    getHorariosOcupados,
    verificarDisponibilidad,
};
