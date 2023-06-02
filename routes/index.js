const express = require('express');
const router = express.Router();

const authRoute = require('./authRoutes');
const userRoute = require('./userRoutes');
const roleRoute = require('./roleRoutes');
const eventRoute = require('./eventRoutes');
const categoryRoute = require('./categoryRoutes');
const ticketRoute = require('./ticketRoutes');
const athleticRoutes = require('./athleticRoutes.js')

router.use('/auth', authRoute);
router.use('/admin', userRoute);
router.use('/admin', roleRoute);
router.use('/admin', eventRoute);
router.use('/admin', categoryRoute);
router.use('/admin', ticketRoute);
router.use(athleticRoutes);

module.exports = router;