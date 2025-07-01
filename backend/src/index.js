const express = require('express');
const pool = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const usuarioRoutes = require('./routes/usuarios');
const categoriaRoutes = require('./routes/categorias');
const dependenciaRoutes = require('./routes/dependencias');
const recursoRoutes = require('./routes/recursos');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/ping', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ message: 'pong' });
  } catch (err) {
    res.status(500).json({ error: 'Error de conexión a la base de datos', details: err.message });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/dependencias', dependenciaRoutes);
app.use('/api/recursos', recursoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
}); 