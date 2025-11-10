const db = require('../config/config.js');
const bcrypt = require('bcrypt');

// Controlador para login de usuarios
const loginUser = async (req, res) => {
  const { nombre, password } = req.body;

  // Validar que se envíen los campos requeridos
  if (!nombre || !password) {
    return res.status(400).json({
      success: false,
      message: 'Nombre y contraseña son requeridos'
    });
  }

  try {
    // Buscar usuario por nombre
    const query = 'SELECT * FROM usuarios WHERE nombre = ?';

    db.query(query, [nombre], (error, results) => {
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
  
  const { nombre, password, idRol } = req.body;

  // Validar campos requeridos
  if (!nombre || !password || !idRol) {
    console.log('Campos faltantes - nombre:', nombre, 'password:', password ? 'presente' : 'ausente', 'idRol:', idRol);
    return res.status(400).json({
      success: false,
      message: 'Nombre, contraseña e idRol son requeridos'
    });
  }

  console.log('Datos a registrar:', { nombre, idRol }); // No mostrar password

  try {
    // Verificar si el nombre ya existe
    const checkQuery = 'SELECT * FROM usuarios WHERE nombre = ?';
    
    db.query(checkQuery, [nombre], (error, results) => {
      if (error) {
        console.error('Error verificando nombre:', error);
        return res.status(500).json({
          success: false,
          message: 'Error en el servidor'
        });
      }

      if (results.length > 0) {
        console.log('Usuario ya existe:', nombre);
        return res.status(400).json({
          success: false,
          message: 'El nombre de usuario ya está registrado'
        });
      }

      // Hashear la contraseña antes de guardar
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error('Error hasheando contraseña:', err);
          return res.status(500).json({
            success: false,
            message: 'Error en el servidor'
          });
        }

        console.log('Password hasheado correctamente');

        // Insertar nuevo usuario con contraseña hasheada
        const insertQuery = 'INSERT INTO usuarios (nombre, pass, idRol) VALUES (?, ?, ?)';

        console.log('Ejecutando INSERT con idRol:', idRol);

        db.query(insertQuery, [nombre, hashedPassword, idRol], (error, result) => {
          if (error) {
            console.error('Error registrando usuario:', error);
            console.error('SQL State:', error.sqlState);
            console.error('SQL Message:', error.sqlMessage);
            return res.status(500).json({
              success: false,
              message: 'Error al registrar usuario: ' + error.sqlMessage
            });
          }

          console.log('Usuario registrado exitosamente:', result.insertId);

          res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            data: {
              id: result.insertId,
              nombre,
              idRol: idRol
            }
          });
        });
      });
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};

module.exports = {
  loginUser,
  registerUser
};
