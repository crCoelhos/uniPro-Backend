const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { createTransation, getAllTransations} = require('../controllers/transationController.js');

router.post('/transation', authMiddleware, createTransation);
router.get('/transations', authMiddleware, getAllTransations);


module.exports = router;
