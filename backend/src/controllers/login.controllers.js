const db = require('../config/config.js');
const bcrypt = require('bcrypt');

// Controlador para login de usuarios
const loginUser = async (req, res) => {
  const { nombre, password } = req.body;

  // Validar que se envíen los campos requeridos
  if (!nombre || !password) {
    return res.status(400).json({
      success: false,
      message: 'Nombre/mail y contraseña son requeridos'
    });
  }

  try {
    // Buscar usuario por nombre O por mail
    const query = 'SELECT * FROM usuarios WHERE nombre = ? OR mail = ?';

    db.query(query, [nombre, nombre], (error, results) => {
      if (error) {
        console.error('Error en la consulta:', error);
        return res.status(500).json({
          success: false,
          message: 'Error en el servidor'
        });
      }

      // Verificar si el usuario existe
      if (results.length === 0) {
        return res.status(401).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }

      const user = results[0];

      // Verificar contraseña con bcrypt
      bcrypt.compare(password, user.pass, (err, isMatch) => {
        if (err) {
          console.error('Error comparando contraseñas:', err);
          return res.status(500).json({
            success: false,
            message: 'Error en el servidor'
          });
        }

        if (!isMatch) {
          return res.status(401).json({
            success: false,
            message: 'Credenciales inválidas'
          });
        }

        // Login exitoso - eliminar password antes de enviar respuesta
        const { pass: _, ...userWithoutPassword } = user;

        res.status(200).json({
          success: true,
          message: 'Login exitoso',
          data: {
            ...userWithoutPassword,
            idRol: user.idRol // Incluir el rol para redirección
          }
        });
      });
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};

// Controlador para registro de usuarios (opcional)
const registerUser = async (req, res) => {
  console.log('Body recibido:', req.body); // Debug: ver qué llega
  
  const { nombre, mail, password } = req.body;
  const idRol = 2; // Siempre rol de usuario normal

  // Validar campos requeridos
  if (!nombre || !mail || !password) {
    return res.status(400).json({
      success: false,
      message: 'Nombre, mail y contraseña son requeridos'
    });
  }

  try {
    // Verificar si el mail ya existe
    const checkQuery = 'SELECT * FROM usuarios WHERE mail = ? OR nombre = ?';

    db.query(checkQuery, [mail, nombre], (error, results) => {
      if (error) {
        console.error('Error verificando usuario:', error);
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
      }

      if (results.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'El nombre de usuario o email ya está registrado'
        });
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error('Error hasheando contraseña:', err);
          return res.status(500).json({ success: false, message: 'Error en el servidor' });
        }

        const insertQuery = 'INSERT INTO usuarios (nombre, mail, pass, idRol) VALUES (?, ?, ?, ?)';

        db.query(insertQuery, [nombre, mail, hashedPassword, idRol], (error, result) => {
          if (error) {
            console.error('Error registrando usuario:', error);
            return res.status(500).json({ success: false, message: 'Error al registrar usuario: ' + error.sqlMessage });
          }

          res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            data: { id: result.insertId, nombre, idRol }
          });
        });
      });
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};

module.exports = {
  loginUser,
  registerUser
};
