const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { createTypeTicket, updateTypeTicketById, deleteTypeTicket, getTypeTicketById, getAllTypeTickets} = require('../controllers/typeTicketController.js');

router.post('/typeticket', authMiddleware, createTypeTicket);
router.get('/typeticket/:id', authMiddleware, getTypeTicketById);
router.get('/typetickets', authMiddleware, getAllTypeTickets);
router.put('/typeticket/:id', authMiddleware, updateTypeTicketById);
router.delete('/typeticket/:id', authMiddleware, deleteTypeTicket);


module.exports = router;