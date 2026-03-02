const db = require('../config/config.js');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const transporter = require('../config/nodemailer');

// Almacenar tokens temporalmente (en producción, usa la BD)
const resetTokens = new Map();

// Solicitar recuperación de contraseña
const solicitarRecuperacion = async (req, res) => {
  const { mail } = req.body;

  if (!mail) {
    return res.status(400).json({
      success: false,
      message: 'El correo electrónico es requerido'
    });
  }

  // Verificar si el servicio de email está configurado
  if (!transporter) {
    return res.status(503).json({
      success: false,
      message: 'El servicio de correo no está disponible. Por favor, contacta al administrador.'
    });
  }

  try {
    // Verificar si el correo existe en la BD
    const query = 'SELECT * FROM usuarios WHERE mail = ?';

    db.query(query, [mail], async (error, results) => {
      if (error) {
        console.error('Error en la consulta:', error);
        return res.status(500).json({
          success: false,
          message: 'Error en el servidor'
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No existe un usuario registrado con ese correo'
        });
      }

      const user = results[0];

      // Generar token único
      const token = crypto.randomBytes(32).toString('hex');
      const expiration = Date.now() + 3600000; // 1 hora de expiración

      // Guardar token (en producción, guárdalo en la BD)
      resetTokens.set(token, {
        userId: user.idUsuario,
        mail: user.mail,
        expiration: expiration
      });

      // URL de recuperación
      const resetUrl = `http://localhost:5173/reset-password/${token}`;

      // Configurar el correo
      const mailOptions = {
        from: process.env.EMAIL_USER || 'yumotors@gmail.com',
        to: mail,
        subject: 'Recuperación de Contraseña - Yu Motors',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #d32f2f;">Recuperación de Contraseña</h2>
            <p>Hola <strong>${user.nombre}</strong>,</p>
            <p>Recibimos una solicitud para restablecer tu contraseña.</p>
            <p>Haz clic en el siguiente botón para crear una nueva contraseña:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #d32f2f; 
                        color: white; 
                        padding: 12px 30px; 
                        text-decoration: none; 
                        border-radius: 5px;
                        display: inline-block;">
                Restablecer Contraseña
              </a>
            </div>
            <p>O copia y pega este enlace en tu navegador:</p>
            <p style="word-break: break-all; color: #666;">${resetUrl}</p>
            <p style="color: #999; font-size: 12px; margin-top: 30px;">
              Este enlace expirará en 1 hora.<br>
              Si no solicitaste este cambio, ignora este correo.
            </p>
          </div>
        `
      };

      // Enviar correo
      try {
        await transporter.sendMail(mailOptions);
        
        res.status(200).json({
          success: true,
          message: 'Se ha enviado un correo con instrucciones para recuperar tu contraseña'
        });
      } catch (emailError) {
        console.error('Error al enviar correo:', emailError);
        res.status(500).json({
          success: false,
          message: 'Error al enviar el correo de recuperación'
        });
      }
    });
  } catch (error) {
    console.error('Error en solicitud de recuperación:', error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};

// Verificar token de recuperación
const verificarToken = (req, res) => {
  const { token } = req.params;

  const tokenData = resetTokens.get(token);

  if (!tokenData) {
    return res.status(400).json({
      success: false,
      message: 'Token inválido o expirado'
    });
  }

  if (Date.now() > tokenData.expiration) {
    resetTokens.delete(token);
    return res.status(400).json({
      success: false,
      message: 'El token ha expirado'
    });
  }

  res.status(200).json({
    success: true,
    message: 'Token válido'
  });
};

// Resetear contraseña
const resetearPassword = async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'Ambas contraseñas son requeridas'
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: 'Las contraseñas no coinciden'
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'La contraseña debe tener al menos 6 caracteres'
    });
  }

  const tokenData = resetTokens.get(token);

  if (!tokenData) {
    return res.status(400).json({
      success: false,
      message: 'Token inválido o expirado'
    });
  }

  if (Date.now() > tokenData.expiration) {
    resetTokens.delete(token);
    return res.status(400).json({
      success: false,
      message: 'El token ha expirado'
    });
  }

  try {
    // Hashear nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Actualizar contraseña en la BD
    const query = 'UPDATE usuarios SET pass = ? WHERE idUsuario = ?';

    db.query(query, [hashedPassword, tokenData.userId], (error, results) => {
      if (error) {
        console.error('Error al actualizar contraseña:', error);
        return res.status(500).json({
          success: false,
          message: 'Error al actualizar la contraseña'
        });
      }

      // Eliminar token usado
      resetTokens.delete(token);

      res.status(200).json({
        success: true,
        message: 'Contraseña actualizada exitosamente'
      });
    });
  } catch (error) {
    console.error('Error al resetear contraseña:', error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor'
    });
  }
};

module.exports = {
  solicitarRecuperacion,
  verificarToken,
  resetearPassword
};
