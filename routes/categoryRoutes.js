const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById  } = require('../controllers/categoryController.js');

router.post('/category', authMiddleware, createCategory);
router.get('/category/:id', getCategoryById);
router.get('/categories', getAllCategories);
router.put('/category/:id', authMiddleware, updateCategoryById);
router.delete('/category:id', authMiddleware, deleteCategoryById);

module.exports = router;
