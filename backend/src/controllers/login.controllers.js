const db = require('../config/config.js');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const transporter = require('../config/nodemailer');

// Almacenar registros pendientes de verificación (token → datos de usuario)
const pendingRegistrations = new Map();

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

// Controlador para registro de usuarios (envía email de verificación)
const registerUser = async (req, res) => {
  console.log('Body recibido:', req.body);

  const { nombre, mail, password } = req.body;
  const idRol = 2;

  if (!nombre || !mail || !password) {
    return res.status(400).json({
      success: false,
      message: 'Nombre, mail y contraseña son requeridos'
    });
  }

  if (!transporter) {
    return res.status(503).json({
      success: false,
      message: 'El servicio de correo no está disponible. Por favor, contacta al administrador.'
    });
  }

  try {
    const checkQuery = 'SELECT * FROM usuarios WHERE mail = ? OR nombre = ?';

    db.query(checkQuery, [mail, nombre], async (error, results) => {
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

      // Verificar si ya hay un registro pendiente para ese mail o nombre
      for (const [, data] of pendingRegistrations) {
        if (data.mail === mail || data.nombre === nombre) {
          return res.status(400).json({
            success: false,
            message: 'Ya existe un registro pendiente de verificación para ese correo o nombre de usuario'
          });
        }
      }

      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          console.error('Error hasheando contraseña:', err);
          return res.status(500).json({ success: false, message: 'Error en el servidor' });
        }

        const token = crypto.randomBytes(32).toString('hex');
        const expiration = Date.now() + 3600000; // 1 hora

        pendingRegistrations.set(token, { nombre, mail, hashedPassword, idRol, expiration });

        const activationUrl = `http://localhost:5173/verify-email/${token}`;

        const mailOptions = {
          from: process.env.EMAIL_USER || 'yumotors@gmail.com',
          to: mail,
          subject: 'Activación de Cuenta - Yu Motors',
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #d32f2f;">Activá tu cuenta en Yu Motors</h2>
              <p>Hola <strong>${nombre}</strong>,</p>
              <p>Gracias por registrarte. Para completar tu registro hacé clic en el botón de abajo:</p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${activationUrl}"
                   style="background-color: #d32f2f;
                          color: white;
                          padding: 12px 30px;
                          text-decoration: none;
                          border-radius: 5px;
                          display: inline-block;">
                  Activar Cuenta
                </a>
              </div>
              <p>O copiá y pegá este enlace en tu navegador:</p>
              <p style="word-break: break-all; color: #666;">${activationUrl}</p>
              <p style="color: #999; font-size: 12px; margin-top: 30px;">
                Este enlace expirará en 1 hora.<br>
                Si no solicitaste este registro, ignorá este correo.
              </p>
            </div>
          `
        };

        try {
          await transporter.sendMail(mailOptions);
          res.status(200).json({
            success: true,
            message: 'Te enviamos un correo de activación. Revisá tu casilla y hacé clic en el enlace para activar tu cuenta.'
          });
        } catch (emailError) {
          console.error('Error al enviar correo de activación:', emailError);
          pendingRegistrations.delete(token);
          res.status(500).json({ success: false, message: 'Error al enviar el correo de activación' });
        }
      });
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};

// Verificar el token de activación y crear el usuario
const verifyEmail = (req, res) => {
  const { token } = req.params;

  const pending = pendingRegistrations.get(token);

  if (!pending) {
    return res.status(400).json({
      success: false,
      message: 'El enlace de activación no es válido o ya fue utilizado.'
    });
  }

  if (Date.now() > pending.expiration) {
    pendingRegistrations.delete(token);
    return res.status(400).json({
      success: false,
      message: 'El enlace de activación expiró. Por favor, volvé a registrarte.'
    });
  }

  const { nombre, mail, hashedPassword, idRol } = pending;

  // Verificar una vez más que no exista el usuario (por si acaso)
  const checkQuery = 'SELECT idUsuario FROM usuarios WHERE mail = ? OR nombre = ?';
  db.query(checkQuery, [mail, nombre], (error, results) => {
    if (error) {
      console.error('Error verificando usuario:', error);
      return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }

    if (results.length > 0) {
      pendingRegistrations.delete(token);
      return res.status(400).json({
        success: false,
        message: 'El nombre de usuario o email ya está registrado.'
      });
    }

    const insertQuery = 'INSERT INTO usuarios (nombre, mail, pass, idRol) VALUES (?, ?, ?, ?)';
    db.query(insertQuery, [nombre, mail, hashedPassword, idRol], (err, result) => {
      if (err) {
        console.error('Error creando usuario:', err);
        return res.status(500).json({ success: false, message: 'Error al crear el usuario: ' + err.sqlMessage });
      }

      pendingRegistrations.delete(token);

      res.status(201).json({
        success: true,
        message: '¡Cuenta activada exitosamente! Ya podés iniciar sesión.',
        data: { id: result.insertId, nombre, idRol }
      });
    });
  });
};

module.exports = {
  loginUser,
  registerUser,
  verifyEmail
};
