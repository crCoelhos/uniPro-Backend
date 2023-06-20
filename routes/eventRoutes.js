const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { createEvent, updateEvent, deleteEvent, getEventById, getAllEvent, getUserAthleticByEvent } = require('../controllers/eventController.js');

router.post('/event', authMiddleware, createEvent);
router.get('/event/:id', getEventById);
router.get('/events', getAllEvent);
router.put('/event/:id', authMiddleware, updateEvent);
router.delete('/event/:id', authMiddleware, deleteEvent);
router.get('/dashboardevent',authMiddleware, getUserAthleticByEvent);


module.exports = router;
