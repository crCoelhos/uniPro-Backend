const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { createModality, getAllModalities, getModalityById, updateModalityById, deleteModalityById  } = require('../controllers/modalityController.js');

router.post('/modality', authMiddleware, createModality);
router.get('/modality/:id', getModalityById);
router.get('/modalities', getAllModalities);
router.put('/modality/:id', authMiddleware, updateModalityById);
router.delete('/modality:id', authMiddleware, deleteModalityById);

module.exports = router;
