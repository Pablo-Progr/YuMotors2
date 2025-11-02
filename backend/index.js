const dotenv = require('dotenv');
const app = require('./src/app');
const db = require('./src/config/config');
const loginRoutes = require('./src/routes/login.routes');

dotenv.config();

const PORT = process.env.PORT || 3000;

// Probar la conexión al arrancar
db.connect((error) => {
  if (error) {
    console.error("Error conectando a la base de datos:", error);
  } else {
    console.log("Conexión a la base de datos exitosa.");
  }
});

// Rutas
app.use('/api/auth', loginRoutes);

app.get("/", (req, res) => {
    res.send("Conexion funcionando correctamente.");
});



app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
