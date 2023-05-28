const express = require('express');
const router = express.Router();
const { login, signup } = require('../controllers/authController.js');
const accessMiddleware = require('../middleware/acessMiddleware.js');

router.post('/login', accessMiddleware,login);
router.post('/signup', signup);

// router.get('/protected', authMiddleware, protected);

module.exports = router;
