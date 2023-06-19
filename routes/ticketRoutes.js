const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { createTicket, updateTicketById, deleteTicketById, getTicketById, getAllTickets, buyTicket} = require('../controllers/ticketController.js');
const { bookTicket, Pay } = require('../controllers/paymentController.js')

router.post('/ticket', authMiddleware, createTicket);
router.post('/bookticket', authMiddleware, bookTicket);
//router.post('/proccesspayment', ProcessPayment);
router.get('/buyticket', authMiddleware, buyTicket);
router.get('/ticket/:id', getTicketById);
router.get('/tickets', getAllTickets);
router.put('/ticket/:id', updateTicketById);
router.delete('/ticket/:id', deleteTicketById);

router.post('/pay', Pay);


module.exports = router;
