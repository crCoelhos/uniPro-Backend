const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { createUserAthletic, updateUserAthletic, getAllUserAthletics, getUserAthleticByEventForMod } = require('../controllers/userAthleticController.js');

router.post('/userathletic', authMiddleware, createUserAthletic);
router.get('/userathletic', authMiddleware, getAllUserAthletics);
router.put('/userathletic/:id', authMiddleware, updateUserAthletic);
router.get('/dashboardathletic/:id',authMiddleware, getUserAthleticByEventForMod);


module.exports = router;