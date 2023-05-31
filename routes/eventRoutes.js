const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { createEvent, updateEvent, deleteEvent, getEvent, getAllEvent } = require('../controllers/eventController.js');

router.post('/event', createEvent);
router.get('/event/:id', getEvent);
router.get('/events', getAllEvent);
router.put('/event/:id', updateEvent);
router.delete('/event:id', deleteEvent);

module.exports = router;
