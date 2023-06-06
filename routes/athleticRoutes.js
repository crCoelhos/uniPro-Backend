const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const { createAthletic, deleteAthletic, getAthleticByName, getAllAthletics, removeUserFromAthletic, addUserToAthletic } = require('../controllers/athleticController.js');

router.post('/athletics', authMiddleware, createAthletic);
router.delete('/athletics/:id', authMiddleware, deleteAthletic);

router.get('/athletics/:name', getAthleticByName);
router.get('/athletics', getAllAthletics);

// need revision code... and logic
router.post('/athletics/:id/users/add', addUserToAthletic);
router.post('/athletics/:id/users/remove', removeUserFromAthletic);


module.exports = router;
