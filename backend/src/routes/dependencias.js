const express = require('express');
const router = express.Router();
const dependenciaController = require('../controllers/dependenciaController');

router.get('/', dependenciaController.getDependencias);
router.get('/:id', dependenciaController.getDependencia);
router.post('/', dependenciaController.createDependencia);
router.put('/:id', dependenciaController.updateDependencia);
router.delete('/:id', dependenciaController.deleteDependencia);

module.exports = router; 