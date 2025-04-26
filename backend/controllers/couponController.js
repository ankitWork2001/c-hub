import Coupon from '../models/couponModel.js';
import Store from "../models/storeModel.js";
import Category from "../models/categoryModel.js";

// Create a new coupon
export const createCoupon = async (req, res) => {
    try {
        const newCoupon = new Coupon(req.body);
        const savedCoupon = await newCoupon.save();
        res.status(201).json(savedCoupon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all coupons
export const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find().populate("store category");
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single coupon by ID
export const getCouponById = async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id).populate("store category");
        if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
        res.status(200).json(coupon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a coupon by ID
export const updateCoupon = async (req, res) => {
    try {
        const updatedCoupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedCoupon) return res.status(404).json({ message: 'Coupon not found' });
        res.status(200).json(updatedCoupon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a coupon by ID
export const deleteCoupon = async (req, res) => {
    try {
        const deletedCoupon = await Coupon.findByIdAndDelete(req.params.id);
        if (!deletedCoupon) return res.status(404).json({ message: 'Coupon not found' });
        res.status(200).json({ message: 'Coupon deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
