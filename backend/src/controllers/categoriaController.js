const pool = require('../config/db');

exports.getCategorias = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categorias');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener categorías', details: err.message });
  }
};

exports.getCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM categorias WHERE id_categoria = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener categoría', details: err.message });
  }
};

exports.createCategoria = async (req, res) => {
  try {
    const { tipo, nombre, dependencia_id, datos_tecnicos, agencia } = req.body;
    if (!tipo || !nombre) return res.status(400).json({ error: 'Faltan campos requeridos' });
    const result = await pool.query(
      'INSERT INTO categorias (tipo, nombre, dependencia_id, datos_tecnicos, agencia) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [tipo, nombre, dependencia_id, datos_tecnicos, agencia]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear categoría', details: err.message });
  }
};

exports.updateCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo, nombre, dependencia_id, datos_tecnicos, agencia } = req.body;
    const result = await pool.query(
      'UPDATE categorias SET tipo = $1, nombre = $2, dependencia_id = $3, datos_tecnicos = $4, agencia = $5 WHERE id_categoria = $6 RETURNING *',
      [tipo, nombre, dependencia_id, datos_tecnicos, agencia, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar categoría', details: err.message });
  }
};

exports.deleteCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM categorias WHERE id_categoria = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
    res.json({ message: 'Categoría eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar categoría', details: err.message });
  }
}; 