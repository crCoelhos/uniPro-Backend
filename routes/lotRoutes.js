const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { createLot, updateLotById, deleteLotById, getLotById, getAllLots } = require('../controllers/lotController.js');

router.post('/lot', authMiddleware, createLot);
router.get('/lot/:id', authMiddleware, getLotById);
router.get('/lots', getAllLots);
router.put('/lot/:id', authMiddleware, updateLotById);
router.delete('/lot:id', authMiddleware, deleteLotById);

module.exports = router;
