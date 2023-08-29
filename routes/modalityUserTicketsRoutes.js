const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { createModalityUserTickets, getAllModalitiesUserTickets, getModalityUserTicketsById, updateModalityUserTicketsById, deleteModalityUserTicketsById  } = require('../controllers/modalityUserTicketsController.js');

router.post('/modalitusertickets', authMiddleware, createModalityUserTickets);
router.get('/modalitusertickets/:id', getModalityUserTicketsById);
router.get('/modalitiesusertickets', getAllModalitiesUserTickets);
router.put('/modalitusertickets/:id', authMiddleware, updateModalityUserTicketsById);
router.delete('/modalitusertickets/:id', authMiddleware, deleteModalityUserTicketsById);


module.exports = router;
