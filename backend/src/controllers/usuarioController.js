const bcrypt = require('bcrypt');
const pool = require('../config/db');

// Obtener todos los usuarios
const getAllUsuarios = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT u.id_usuario, u.nombre, u.usuario, u.rol, u.correo, u.contacto, 
             d.nombre as dependencia_nombre
      FROM usuarios u 
      LEFT JOIN dependencias d ON u.dependencia_id = d.id_dependencia 
      ORDER BY u.nombre
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener usuarios por rol
const getUsuariosByRol = async (req, res) => {
  try {
    const { rol } = req.params;
    const result = await pool.query(`
      SELECT u.id_usuario, u.nombre, u.usuario, u.rol, u.correo, u.contacto, 
             d.nombre as dependencia_nombre
      FROM usuarios u 
      LEFT JOIN dependencias d ON u.dependencia_id = d.id_dependencia 
      WHERE u.rol = $1
      ORDER BY u.nombre
    `, [rol]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener usuarios por rol:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT u.id_usuario, u.nombre, u.usuario, u.rol, u.correo, u.contacto, 
             d.nombre as dependencia_nombre, u.dependencia_id
      FROM usuarios u 
      LEFT JOIN dependencias d ON u.dependencia_id = d.id_dependencia 
      WHERE u.id_usuario = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Crear nuevo usuario
const createUsuario = async (req, res) => {
  try {
    const { nombre, usuario, password, rol, dependencia_id, correo, contacto } = req.body;
    
    // Validaciones
    if (!nombre || !usuario || !password || !rol || !correo) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }
    
    // Verificar si el usuario ya existe
    const existingUser = await pool.query(
      'SELECT * FROM usuarios WHERE usuario = $1',
      [usuario]
    );
    
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }
    
    // Encriptar contraseña
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    // Insertar nuevo usuario
    const result = await pool.query(
      `INSERT INTO usuarios (nombre, usuario, password_hash, rol, dependencia_id, correo, contacto) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id_usuario, nombre, usuario, rol, correo, contacto, dependencia_id`,
      [nombre, usuario, passwordHash, rol, dependencia_id, correo, contacto]
    );
    
    res.status(201).json({
      message: 'Usuario creado exitosamente',
      usuario: result.rows[0]
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Actualizar usuario
const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, usuario, password, rol, dependencia_id, correo, contacto } = req.body;
    
    // Verificar si el usuario existe
    const existingUser = await pool.query(
      'SELECT * FROM usuarios WHERE id_usuario = $1',
      [id]
    );
    
    if (existingUser.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    // Verificar si el nuevo nombre de usuario ya existe (si se está cambiando)
    if (usuario && usuario !== existingUser.rows[0].usuario) {
      const duplicateUser = await pool.query(
        'SELECT * FROM usuarios WHERE usuario = $1 AND id_usuario != $2',
        [usuario, id]
      );
      
      if (duplicateUser.rows.length > 0) {
        return res.status(400).json({ message: 'El nombre de usuario ya existe' });
      }
    }
    
    // Preparar datos para actualización
    let updateFields = [];
    let values = [];
    let paramCount = 1;
    
    if (nombre) {
      updateFields.push(`nombre = $${paramCount++}`);
      values.push(nombre);
    }
    if (usuario) {
      updateFields.push(`usuario = $${paramCount++}`);
      values.push(usuario);
    }
    if (password) {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      updateFields.push(`password_hash = $${paramCount++}`);
      values.push(passwordHash);
    }
    if (rol) {
      updateFields.push(`rol = $${paramCount++}`);
      values.push(rol);
    }
    if (dependencia_id !== undefined) {
      updateFields.push(`dependencia_id = $${paramCount++}`);
      values.push(dependencia_id);
    }
    if (correo) {
      updateFields.push(`correo = $${paramCount++}`);
      values.push(correo);
    }
    if (contacto !== undefined) {
      updateFields.push(`contacto = $${paramCount++}`);
      values.push(contacto);
    }
    
    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No hay campos para actualizar' });
    }
    
    values.push(id);
    const result = await pool.query(
      `UPDATE usuarios SET ${updateFields.join(', ')} WHERE id_usuario = $${paramCount} 
       RETURNING id_usuario, nombre, usuario, rol, correo, contacto, dependencia_id`,
      values
    );
    
    res.json({
      message: 'Usuario actualizado exitosamente',
      usuario: result.rows[0]
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Eliminar usuario
const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Verificar si hay tickets asociados
    const checkTickets = await pool.query(
      'SELECT COUNT(*) FROM tickets WHERE cliente_id = $1 OR tecnico_id = $1',
      [id]
    );
    
    if (parseInt(checkTickets.rows[0].count) > 0) {
      return res.status(400).json({ 
        message: 'No se puede eliminar el usuario porque tiene tickets asociados' 
      });
    }
    
    const result = await pool.query(
      'DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = {
  getAllUsuarios,
  getUsuariosByRol,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
}; 