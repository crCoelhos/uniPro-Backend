const express = require('express');
const router = express.Router();
const { login, signup } = require('../controllers/authController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

router.post('/login', login);
router.post('/signup', signup);


// router.get('/protected', authMiddleware, protected);

module.exports = router;
