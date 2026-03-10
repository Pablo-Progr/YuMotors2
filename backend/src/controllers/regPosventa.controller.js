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
    const { fecha, hora, kilometraje, tipoPostVent, descripcion } = req.body;

    // Solo se puede editar si el turno está en estado Pendiente (0)
    const checkQuery = `SELECT estado FROM registropostventa WHERE idRegistroPostVenta = ?`;
    db.query(checkQuery, [id], (checkErr, checkResults) => {
        if (checkErr) {
            console.error('Error al verificar estado:', checkErr);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (checkResults.length === 0) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }
        if (checkResults[0].estado !== 0) {
            return res.status(400).json({ error: 'Solo se pueden editar turnos en estado Pendiente' });
        }

        const horaCorta = hora.substring(0, 5);
        const horaCompleta = `${horaCorta}:00`;

        // Verificar conflicto de horario excluyendo el propio registro
        const conflictQuery = `SELECT * FROM registropostventa WHERE fecha = ? AND hora = ? AND idRegistroPostVenta != ?`;
        db.query(conflictQuery, [fecha, horaCompleta, id], (confErr, confResults) => {
            if (confErr) {
                console.error('Error al verificar conflicto:', confErr);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
            if (confResults.length > 0) {
                return res.status(409).json({ error: 'El turno seleccionado ya está ocupado. Por favor, elija otro horario.' });
            }

            const query = `UPDATE registropostventa 
                           SET fecha = ?, hora = ?, kilometraje = ?, tipoPostVent = ?, descripcion = ?
                           WHERE idRegistroPostVenta = ?`;

            db.query(query, [fecha, horaCompleta, kilometraje, tipoPostVent, descripcion, id], (err) => {
                if (err) {
                    console.error('Error al actualizar el registro postventa:', err);
                    return res.status(500).json({ error: 'Error interno del servidor' });
                }
                res.json({ message: 'Registro postventa actualizado exitosamente' });
            });
        });
    });
};

const createRegistro = (req, res) => {
    const { idVehiculoPostVenta, fecha, hora, kilometraje, tipoPostVent, descripcion, estado } = req.body;

    // Normalizar hora a formato HH:MM:00 para comparación consistente
    const horaCorta = hora.substring(0, 5);
    const horaCompleta = `${horaCorta}:00`;

    // Verificar si el vehículo ya tiene un turno activo (Pendiente=0 o En Proceso=1)
    const checkActivoQuery = `SELECT * FROM registropostventa WHERE idVehiculoPostVenta = ? AND estado IN (0, 1) LIMIT 1`;

    db.query(checkActivoQuery, [idVehiculoPostVenta], (activoErr, activoResults) => {
        if (activoErr) {
            console.error('Error al verificar turno activo:', activoErr);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        if (activoResults.length > 0) {
            const estadoTexto = activoResults[0].estado === 0 ? 'Pendiente' : 'En Proceso';
            return res.status(409).json({ 
                error: `Ya tenés un turno en estado "${estadoTexto}" para este vehículo. No podés agendar otro hasta que se complete o cancele.`,
                turnoActivo: activoResults[0]
            });
        }

        // Verificar si el turno ya está ocupado
        const checkQuery = `SELECT * FROM registropostventa WHERE fecha = ? AND hora = ?`;
        
        db.query(checkQuery, [fecha, horaCompleta], (checkErr, checkResults) => {
            if (checkErr) {
                console.error('Error al verificar disponibilidad:', checkErr);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }

            if (checkResults.length > 0) {
                return res.status(409).json({ error: 'El turno seleccionado ya está ocupado. Por favor, elija otro horario.' });
            }

            const query = `INSERT INTO registropostventa (idVehiculoPostVenta, fecha, hora, kilometraje, tipoPostVent, descripcion, estado)
                           VALUES (?, ?, ?, ?, ?, ?, ?)`;

            db.query(query, [idVehiculoPostVenta, fecha, horaCompleta, kilometraje, tipoPostVent, descripcion, estado], (err, results) => {
                if (err) {
                    console.error('Error al crear el registro postventa:', err);
                    return res.status(500).json({ error: 'Error interno del servidor' });
                }
                res.status(201).json({ message: 'Registro postventa creado exitosamente', id: results.insertId });
            });
        });
    });
};

// Obtener horarios ocupados para una fecha específica
const getHorariosOcupados = (req, res) => {
    const { fecha } = req.params;
    const { excludeId } = req.query;

    if (!fecha) {
        return res.status(400).json({ error: 'Fecha requerida' });
    }

    let query = `SELECT SUBSTRING(hora, 1, 5) as hora FROM registropostventa WHERE fecha = ?`;
    const params = [fecha];

    if (excludeId) {
        query += ` AND idRegistroPostVenta != ?`;
        params.push(excludeId);
    }
    
    db.query(query, params, (err, results) => {
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

const getRegistroById = (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM registropostventa WHERE idRegistroPostVenta = ?`;
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener registro:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Registro no encontrado' });
        }
        res.json(results[0]);
    });
};

const getTurnoActivo = (req, res) => {
    const { idVehiculo } = req.params;
    const query = `SELECT * FROM registropostventa WHERE idVehiculoPostVenta = ? AND estado IN (0, 1) ORDER BY idRegistroPostVenta DESC LIMIT 1`;
    db.query(query, [idVehiculo], (err, results) => {
        if (err) {
            console.error('Error al obtener turno activo:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json(results.length > 0 ? results[0] : null);
    });
};

const cancelarTurno = (req, res) => {
    const { id } = req.params;
    // Verificar que el turno esté en estado Pendiente (0)
    const checkQuery = `SELECT estado FROM registropostventa WHERE idRegistroPostVenta = ?`;
    db.query(checkQuery, [id], (checkErr, checkResults) => {
        if (checkErr) {
            console.error('Error al verificar turno:', checkErr);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (checkResults.length === 0) {
            return res.status(404).json({ error: 'Turno no encontrado' });
        }
        if (checkResults[0].estado !== 0) {
            return res.status(400).json({ error: 'Solo se pueden cancelar turnos en estado Pendiente' });
        }

        const updateQuery = `UPDATE registropostventa SET estado = 3 WHERE idRegistroPostVenta = ?`;
        db.query(updateQuery, [id], (err) => {
            if (err) {
                console.error('Error al cancelar turno:', err);
                return res.status(500).json({ error: 'Error interno del servidor' });
            }
            res.json({ message: 'Turno cancelado exitosamente' });
        });
    });
};

// Actualización de registro para admin (sin restricciones de estado)
const updateRegistroAdmin = (req, res) => {
    const { id } = req.params;
    const { fecha, hora, kilometraje, tipoPostVent, descripcion, estado } = req.body;

    const horaCorta = hora.substring(0, 5);
    const horaCompleta = `${horaCorta}:00`;

    const query = `UPDATE registropostventa 
                   SET fecha = ?, hora = ?, kilometraje = ?, tipoPostVent = ?, descripcion = ?, estado = ?
                   WHERE idRegistroPostVenta = ?`;

    db.query(query, [fecha, horaCompleta, kilometraje, tipoPostVent, descripcion, estado, id], (err) => {
        if (err) {
            console.error('Error al actualizar el registro postventa:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json({ message: 'Registro postventa actualizado exitosamente' });
    });
};

module.exports = {
    getRegistros,
    updateRegistro,
    updateRegistroAdmin,
    createRegistro,
    getHorariosOcupados,
    verificarDisponibilidad,
    getRegistroById,
    getTurnoActivo,
    cancelarTurno,
};
