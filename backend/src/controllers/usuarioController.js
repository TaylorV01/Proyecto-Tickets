const pool = require('../config/db');

exports.getUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios', details: err.message });
  }
};

exports.getUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuario', details: err.message });
  }
};

exports.createUsuario = async (req, res) => {
  try {
    const { nombre, usuario, password, rol, dependencia_id, correo, contacto } = req.body;
    if (!nombre || !usuario || !password || !rol || !correo) return res.status(400).json({ error: 'Faltan campos requeridos' });
    const existe = await pool.query('SELECT * FROM usuarios WHERE usuario = $1', [usuario]);
    if (existe.rows.length > 0) return res.status(400).json({ error: 'El usuario ya existe' });
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, usuario, password_hash, rol, dependencia_id, correo, contacto) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [nombre, usuario, hashedPassword, rol, dependencia_id, correo, contacto]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear usuario', details: err.message });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, usuario, password, rol, dependencia_id, correo, contacto } = req.body;
    let query = 'UPDATE usuarios SET nombre = $1, usuario = $2, rol = $3, dependencia_id = $4, correo = $5, contacto = $6';
    let params = [nombre, usuario, rol, dependencia_id, correo, contacto, id];
    if (password) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash(password, 10);
      query += ', password_hash = $7 WHERE id_usuario = $8 RETURNING *';
      params = [nombre, usuario, rol, dependencia_id, correo, contacto, hashedPassword, id];
    } else {
      query += ' WHERE id_usuario = $7 RETURNING *';
    }
    const result = await pool.query(query, params);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar usuario', details: err.message });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar usuario', details: err.message });
  }
}; 