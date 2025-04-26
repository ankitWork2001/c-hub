import express from 'express';
import { 
  getDashboardStats, 
  getRecentActivity, 
  getAdminUsers, 
  updateFeaturedStatus, 
  getAnalytics, 
  bulkUpdateCouponStatus, 
  updateProfile 
} from '../controllers/adminController.js';
import {authenticate} from '../middleware/authMiddleware.js';

const router = express.Router();

// Dashboard statistics
router.get('/dashboard',authenticate, getDashboardStats); // GET /api/admin/dashboard

// Recent activity
router.get('/recent-activity',authenticate, getRecentActivity); // GET /api/admin/recent-activity

// Get all admin users
router.get('/users',authenticate, getAdminUsers); // GET /api/admin/users

// Update featured status of a coupon
router.put('/coupons/:id/featured',authenticate, updateFeaturedStatus); // PUT /api/admin/coupons/:id/featured

// Get analytics by store or category
router.get('/analytics/store/:storeId',authenticate, getAnalytics); // GET /api/admin/analytics/store/:storeId
router.get('/analytics/category/:categoryId',authenticate, getAnalytics); // GET /api/admin/analytics/category/:categoryId

// Bulk update coupon status
router.put('/coupons/bulk-status-update',authenticate, bulkUpdateCouponStatus); // PUT /api/admin/coupons/bulk-status-update

// Update admin profile
router.put('/profile',authenticate, updateProfile); // PUT /api/admin/profile

export default router;
