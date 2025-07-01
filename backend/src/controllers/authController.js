const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro';

// Registro de usuario
exports.register = async (req, res) => {
  const { usuario, password, rol } = req.body;
  if (!usuario || !password || !rol) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  try {
    // Verificar si el usuario ya existe
    const existe = await pool.query('SELECT * FROM usuarios WHERE usuario = $1', [usuario]);
    if (existe.rows.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }
    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO usuarios (usuario, password_hash, rol) VALUES ($1, $2, $3)', [usuario, hashedPassword, rol]);
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error en el registro', details: err.message });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  const { usuario, password } = req.body;
  if (!usuario || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE usuario = $1', [usuario]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }
    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }
    // Generar token
    const token = jwt.sign({ id: user.id, usuario: user.usuario, rol: user.rol }, JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, usuario: user.usuario, rol: user.rol });
  } catch (err) {
    res.status(500).json({ error: 'Error en el login', details: err.message });
  }
}; 