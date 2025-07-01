const pool = require('../config/db');

exports.getRecursos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM recursos');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener recursos', details: err.message });
  }
};

exports.getRecurso = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM recursos WHERE id_recurso = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Recurso no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener recurso', details: err.message });
  }
};

exports.createRecurso = async (req, res) => {
  try {
    const { nombre, datos_tecnicos, agencia, dependencia_id } = req.body;
    if (!nombre) return res.status(400).json({ error: 'Falta el nombre' });
    const result = await pool.query('INSERT INTO recursos (nombre, datos_tecnicos, agencia, dependencia_id) VALUES ($1, $2, $3, $4) RETURNING *', [nombre, datos_tecnicos, agencia, dependencia_id]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear recurso', details: err.message });
  }
};

exports.updateRecurso = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, datos_tecnicos, agencia, dependencia_id } = req.body;
    const result = await pool.query('UPDATE recursos SET nombre = $1, datos_tecnicos = $2, agencia = $3, dependencia_id = $4 WHERE id_recurso = $5 RETURNING *', [nombre, datos_tecnicos, agencia, dependencia_id, id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Recurso no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar recurso', details: err.message });
  }
};

exports.deleteRecurso = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM recursos WHERE id_recurso = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Recurso no encontrado' });
    res.json({ message: 'Recurso eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar recurso', details: err.message });
  }
}; 