const express = require('express');
const pool = require('./config/db');
const cors = require('cors');

// Importar rutas
const authRoutes = require('./routes/auth');
const dependenciaRoutes = require('./routes/dependencias');
const usuarioRoutes = require('./routes/usuarios');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/dependencias', dependenciaRoutes);
app.use('/api/usuarios', usuarioRoutes);

// Endpoint de prueba
app.get('/ping', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ message: 'pong' });
  } catch (err) {
    res.status(500).json({ error: 'Error de conexión a la base de datos', details: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
  console.log(`API disponible en: http://localhost:${PORT}/api`);
  console.log('Endpoints disponibles:');
  console.log('- POST /api/auth/login');
  console.log('- POST /api/auth/register');
  console.log('- GET /api/dependencias');
  console.log('- GET /api/usuarios');
}); 