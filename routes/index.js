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
const userAthleticRoutes = require('./userAthleticRoutes.js')
const typeTicketRoutes = require('./typeTicketRoutes.js')
const modalityUserTicketsRoutes = require('./modalityUserTicketsRoutes.js')
const modalityRoutes = require('./modalityRoutes.js')
const { Webhook }= require('../controllers/paymentController.js')

router.use('/auth', authRoute, accessMiddleware);
router.use('/admin', userRoute, accessMiddleware);
router.use('/admin', roleRoute, accessMiddleware);
router.use('/admin', eventRoute); 
router.use('/admin', categoryRoute);
router.use('/admin', ticketRoute, accessMiddleware);
router.use('/admin', userAthleticRoutes, accessMiddleware);
router.use('/admin', typeTicketRoutes, accessMiddleware);
router.use('/admin', modalityRoutes, accessMiddleware);
router.use('/admin', modalityUserTicketsRoutes, accessMiddleware);
router.post('/webhook', Webhook);
router.use(athleticRoutes, accessMiddleware);

module.exports = router;