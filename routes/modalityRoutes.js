const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { createModality, getAllModalities, getModalityById, updateModalityById, deleteModalityById, getModalitiesByEvent  } = require('../controllers/modalityController.js');

router.post('/modality', authMiddleware, createModality);
router.get('/modality/:id', getModalityById);
router.get('/modalities', getAllModalities);
router.put('/modality/:id', authMiddleware, updateModalityById);
router.delete('/modality:id', authMiddleware, deleteModalityById);
router.get('/modalitiesbyevent/:id', getModalitiesByEvent);

module.exports = router;
