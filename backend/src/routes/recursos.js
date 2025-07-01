const express = require('express');
const router = express.Router();
const recursoController = require('../controllers/recursoController');

router.get('/', recursoController.getRecursos);
router.get('/:id', recursoController.getRecurso);
router.post('/', recursoController.createRecurso);
router.put('/:id', recursoController.updateRecurso);
router.delete('/:id', recursoController.deleteRecurso);

module.exports = router; 