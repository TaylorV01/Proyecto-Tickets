const express = require('express');
const { login, register } = require('../controllers/authController');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/register (solo admin puede registrar usuarios)
router.post('/register', auth, authorize(['admin']), register);

module.exports = router; 