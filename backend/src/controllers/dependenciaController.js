const pool = require('../config/db');

exports.getDependencias = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dependencias');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener dependencias', details: err.message });
  }
};

exports.getDependencia = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM dependencias WHERE id_dependencia = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Dependencia no encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener dependencia', details: err.message });
  }
};

exports.createDependencia = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ error: 'Falta el nombre' });
    const result = await pool.query('INSERT INTO dependencias (nombre) VALUES ($1) RETURNING *', [nombre]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear dependencia', details: err.message });
  }
};

exports.updateDependencia = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const result = await pool.query('UPDATE dependencias SET nombre = $1 WHERE id_dependencia = $2 RETURNING *', [nombre, id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Dependencia no encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar dependencia', details: err.message });
  }
};

exports.deleteDependencia = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM dependencias WHERE id_dependencia = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Dependencia no encontrada' });
    res.json({ message: 'Dependencia eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar dependencia', details: err.message });
  }
}; 