const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { getdatausersbyevent } = require('../controllers/dashboardController');

router.get('/getdatausersbyevent/:eventId', authMiddleware, getdatausersbyevent);

module.exports = router;