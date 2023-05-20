const express = require('express');
const router = express.Router();
const { login, protected } = require('../controllers/authController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.post('/login', login);


router.get('/protected', authMiddleware, protected);

module.exports = router;
