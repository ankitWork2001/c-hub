import express from 'express';
import { 
    createCoupon, 
    getAllCoupons, 
    getCouponById, 
    updateCoupon, 
    deleteCoupon 
} from '../controllers/couponController.js';
import {authenticate} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/',authenticate, createCoupon); // Create a new coupon
router.get('/', getAllCoupons); // Get all coupons
router.get('/:id', getCouponById); // Get a single coupon by ID
router.put('/:id',authenticate, updateCoupon); // Update a coupon by ID
router.delete('/:id',authenticate, deleteCoupon); // Delete a coupon by ID

export default router;
