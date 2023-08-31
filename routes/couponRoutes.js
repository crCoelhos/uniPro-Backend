const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js')
const { createCoupon, getCoupon, getAllCoupon, updateCoupon, deleteCoupon, consumeCoupon, verifyCoupon} = require('../controllers/couponController');

router.post('/coupons', authMiddleware, createCoupon);
router.get('/coupons/:id', getCoupon);
router.get('/coupons', authMiddleware, getAllCoupon);
router.put('/coupons/:id', authMiddleware, updateCoupon);
router.delete('/coupons/:id', authMiddleware, deleteCoupon);
router.post('/consume/:code', authMiddleware, consumeCoupon);
router.get('/verifycoupon/:code', authMiddleware, verifyCoupon)

module.exports = router;
