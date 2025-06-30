const express = require('express');
const { 
  getAllUsuarios, 
  getUsuariosByRol, 
  getUsuarioById, 
  createUsuario, 
  updateUsuario, 
  deleteUsuario 
} = require('../controllers/usuarioController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(auth);

// GET /api/usuarios - Obtener todos los usuarios (solo admin)
router.get('/', authorize(['admin']), getAllUsuarios);

// GET /api/usuarios/rol/:rol - Obtener usuarios por rol (solo admin)
router.get('/rol/:rol', authorize(['admin']), getUsuariosByRol);

// GET /api/usuarios/:id - Obtener usuario por ID (solo admin)
router.get('/:id', authorize(['admin']), getUsuarioById);

// POST /api/usuarios - Crear nuevo usuario (solo admin)
router.post('/', authorize(['admin']), createUsuario);

// PUT /api/usuarios/:id - Actualizar usuario (solo admin)
router.put('/:id', authorize(['admin']), updateUsuario);

// DELETE /api/usuarios/:id - Eliminar usuario (solo admin)
router.delete('/:id', authorize(['admin']), deleteUsuario);

module.exports = router; 