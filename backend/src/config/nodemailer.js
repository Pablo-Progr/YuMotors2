const nodemailer = require('nodemailer');

// Verificar si las credenciales de email están configuradas
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn('⚠️  Credenciales de email no configuradas. La funcionalidad de envío de correos estará deshabilitada.');
  module.exports = null;
  return;
}

// Configuración del transportador de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verificar la conexión del transportador (no bloqueante)
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Error al configurar nodemailer:', error.message);
    console.log('💡 Solución: Genera una contraseña de aplicación de Gmail en https://myaccount.google.com/apppasswords');
  } else {
    console.log('✅ Servidor de correo listo para enviar mensajes');
  }
});

module.exports = transporter;
