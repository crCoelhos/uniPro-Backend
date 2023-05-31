const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { createBatch, updateBatchById, deleteBatchById, getBatchById, getAllBatchs } = require('../controllers/batchController.js');

router.post('/batch', authMiddleware, createBatch);
router.get('/batch/:id', authMiddleware, getBatchById);
router.get('/batchs', getAllBatchs);
router.put('/batch/:id', authMiddleware, updateBatchById);
router.delete('/batch:id', authMiddleware, deleteBatchById);

module.exports = router;
