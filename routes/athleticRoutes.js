const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const { createAthletic, deleteAthletic, getAthleticByName, getAthleticById, updateAthleticById, getAllAthletics, removeUserFromAthletic, addUserToAthletic } = require('../controllers/athleticController.js');

router.post('/athletic', authMiddleware, createAthletic);
router.put('/athletics/:id', updateAthleticById);
router.delete('/athletics/:id', authMiddleware, deleteAthletic);

router.get('/athletics/:name', getAthleticByName);
router.get('/athletics/:id', getAthleticById);
router.get('/athletics', getAllAthletics);

// need revision code... and logic
router.post('/athletics/:id/users/add', addUserToAthletic);
router.post('/athletics/:id/users/remove', removeUserFromAthletic);


module.exports = router;
