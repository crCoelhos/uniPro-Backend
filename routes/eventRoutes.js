const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { createEvent, updateEvent, deleteEvent } = require('../controllers/eventController.js');

router.post('/event', authMiddleware, createEvent);
router.put('/event', authMiddleware, updateEvent);
router.delete('/event', authMiddleware, deleteEvent);

module.exports = router;
