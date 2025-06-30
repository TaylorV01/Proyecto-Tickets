const express = require('express');
const { 
  getAllDependencias, 
  getDependenciaById, 
  createDependencia, 
  updateDependencia, 
  deleteDependencia 
} = require('../controllers/dependenciaController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(auth);

// GET /api/dependencias - Obtener todas las dependencias
router.get('/', getAllDependencias);

// GET /api/dependencias/:id - Obtener dependencia por ID
router.get('/:id', getDependenciaById);

// POST /api/dependencias - Crear nueva dependencia (solo admin)
router.post('/', authorize(['admin']), createDependencia);

// PUT /api/dependencias/:id - Actualizar dependencia (solo admin)
router.put('/:id', authorize(['admin']), updateDependencia);

// DELETE /api/dependencias/:id - Eliminar dependencia (solo admin)
router.delete('/:id', authorize(['admin']), deleteDependencia);

module.exports = router; 