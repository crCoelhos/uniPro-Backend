const express = require('express');
const router = express.Router();

const accessMiddleware = require('../middleware/acessMiddleware.js');

const authRoute = require('./authRoutes');
const userRoute = require('./userRoutes');
const roleRoute = require('./roleRoutes');
const eventRoute = require('./eventRoutes');
const categoryRoute = require('./categoryRoutes');
const ticketRoute = require('./ticketRoutes');
const athleticRoutes = require('./athleticRoutes.js')
const typeTicketRoutes = require('./typeTicketRoutes.js')
const { Webhook }= require('../controllers/paymentController.js')

router.use('/auth', authRoute, accessMiddleware);
router.use('/admin', userRoute, accessMiddleware);
router.use('/admin', roleRoute, accessMiddleware);
router.use('/admin', eventRoute, accessMiddleware);
router.use('/admin', categoryRoute, accessMiddleware);
router.use('/admin', ticketRoute, accessMiddleware);
router.use('/admin', typeTicketRoutes, accessMiddleware);
router.post('/webhook', Webhook);
router.use(athleticRoutes, accessMiddleware);

module.exports = router;