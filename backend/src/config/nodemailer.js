const nodemailer = require('nodemailer');

// Configuración del transportador de correo
const transporter = nodemailer.createTransport({
  service: 'gmail', // Puedes usar otro servicio como 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER ,
    pass: process.env.EMAIL_PASS 
  }
});

// Verificar la conexión del transportador
transporter.verify((error, success) => {
  if (error) {
    console.error('Error al configurar nodemailer:', error);
  } else {
    console.log('Servidor de correo listo para enviar mensajes');
  }
});

module.exports = transporter;
