const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { createUserAthletic, updateUserAthletic, getAllUserAthletics } = require('../controllers/userAthleticController.js');

router.post('/userathletic', authMiddleware, createUserAthletic);
// router.get('/userathletic/:id', );
router.get('/userathletic', authMiddleware, getAllUserAthletics);
router.put('/userathletic/:id', authMiddleware, updateUserAthletic);
// router.delete('/userathletic/:id', authMiddleware, );


module.exports = router;