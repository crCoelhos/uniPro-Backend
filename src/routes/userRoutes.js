const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

// const User = require("../models/User.js");

// Define as rotas para as operações CRUD de usuarios
router.get('/userroles', authMiddleware, userController.getAllUserRole);
router.get('/:id', authMiddleware, userController.getUserById);
router.post('/', authMiddleware, userController.createUser);
router.put('/:id', authMiddleware, userController.updateUserById);
router.delete('/:id', authMiddleware, userController.deleteUserById);

// Define as rotas para as operações CRUD de UserRoles
router.get('/', authMiddleware, userController.getAllUsers);
// router.get('/:id', authMiddleware, userController.getUserById);
// router.post('/', authMiddleware, userController.createUser);
// router.put('/:id', authMiddleware, userController.updateUserById);
// router.delete('/:id', authMiddleware, userController.deleteUserById);


module.exports = router;
