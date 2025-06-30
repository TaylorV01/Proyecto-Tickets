const pool = require('../config/db');

// Obtener todas las dependencias
const getAllDependencias = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dependencias ORDER BY nombre');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener dependencias:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener una dependencia por ID
const getDependenciaById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM dependencias WHERE id_dependencia = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Dependencia no encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener dependencia:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Crear nueva dependencia
const createDependencia = async (req, res) => {
  try {
    const { nombre } = req.body;
    
    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es requerido' });
    }
    
    const result = await pool.query(
      'INSERT INTO dependencias (nombre) VALUES ($1) RETURNING *',
      [nombre]
    );
    
    res.status(201).json({
      message: 'Dependencia creada exitosamente',
      dependencia: result.rows[0]
    });
  } catch (error) {
    console.error('Error al crear dependencia:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Actualizar dependencia
const updateDependencia = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    
    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es requerido' });
    }
    
    const result = await pool.query(
      'UPDATE dependencias SET nombre = $1 WHERE id_dependencia = $2 RETURNING *',
      [nombre, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Dependencia no encontrada' });
    }
    
    res.json({
      message: 'Dependencia actualizada exitosamente',
      dependencia: result.rows[0]
    });
  } catch (error) {
    console.error('Error al actualizar dependencia:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar dependencia
const deleteDependencia = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar si hay usuarios o recursos asociados
    const checkUsers = await pool.query('SELECT COUNT(*) FROM usuarios WHERE dependencia_id = $1', [id]);
    const checkRecursos = await pool.query('SELECT COUNT(*) FROM recursos WHERE dependencia_id = $1', [id]);
    const checkCategorias = await pool.query('SELECT COUNT(*) FROM categorias WHERE dependencia_id = $1', [id]);
    
    if (parseInt(checkUsers.rows[0].count) > 0 || 
        parseInt(checkRecursos.rows[0].count) > 0 || 
        parseInt(checkCategorias.rows[0].count) > 0) {
      return res.status(400).json({ 
        message: 'No se puede eliminar la dependencia porque tiene usuarios, recursos o categorías asociados' 
      });
    }
    
    const result = await pool.query(
      'DELETE FROM dependencias WHERE id_dependencia = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Dependencia no encontrada' });
    }
    
    res.json({ message: 'Dependencia eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar dependencia:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  getAllDependencias,
  getDependenciaById,
  createDependencia,
  updateDependencia,
  deleteDependencia
}; 