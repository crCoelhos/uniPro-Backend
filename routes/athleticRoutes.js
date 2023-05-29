const express = require('express');
const router = express.Router();
const accessMiddleware = require('../middleware/acessMiddleware.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const { createAthletic, deleteAthletic, getAthleticByName, getAllAthletics, removeUserFromAthletic, addUserToAthletic } = require('../controllers/athleticController.js');

router.post('/athletics', accessMiddleware, authMiddleware, createAthletic);
router.delete('/athletics/:id', accessMiddleware, authMiddleware, deleteAthletic);

router.get('/athletics/:name', accessMiddleware, getAthleticByName);
router.get('/athletics', accessMiddleware, getAllAthletics);

router.post('/athletics/:id/users/add', addUserToAthletic);
router.post('/athletics/:id/users/remove', removeUserFromAthletic);


module.exports = router;
