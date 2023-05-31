const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { createTicket, updateTicketById, deleteTicketById, getTicketById, getAllTickets, processTicket, buyTicket} = require('../controllers/ticketController.js');

router.post('/ticket', authMiddleware, createTicket);
router.post('/processticket', authMiddleware, processTicket);
router.get('/buyticket', authMiddleware, buyTicket);
router.get('/ticket/:id', getTicketById);
router.get('/tickets', getAllTickets);
router.put('/ticket/:id', updateTicketById);
router.delete('/ticket:id', deleteTicketById);

module.exports = router;
