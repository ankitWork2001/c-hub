import User from '../models/userModel.js';
import Store from '../models/storeModel.js';
import Category from '../models/categoryModel.js';
import Coupon from '../models/couponModel.js';

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/admin/dashboard
 * @access  Private/Admin
 */
export const getDashboardStats = async (req, res) => {
  try {
    // Get counts of all entities
    const storeCount = await Store.countDocuments();
    const categoryCount = await Category.countDocuments();
    const couponCount = await Coupon.countDocuments();
    const userCount = await User.countDocuments();
    const activeCoupons = await Coupon.countDocuments({ status: true });
    const expiredCoupons = await Coupon.countDocuments({ expiryDate: { $lt: new Date() } });
    const featuredCoupons = await Coupon.countDocuments({ featured: true });

    // Get total clicks and usage counts
    const clicksAggregation = await Coupon.aggregate([
      { $group: { _id: null, totalClicks: { $sum: "$clickCount" } } }
    ]);
    const usageAggregation = await Coupon.aggregate([
      { $group: { _id: null, totalUsage: { $sum: "$usedCount" } } }
    ]);
    
    const totalClicks = clicksAggregation.length > 0 ? clicksAggregation[0].totalClicks : 0;
    const totalUsage = usageAggregation.length > 0 ? usageAggregation[0].totalUsage : 0;

    res.status(200).json({
      success: true,
      stats: {
        stores: storeCount,
        categories: categoryCount,
        coupons: {
          total: couponCount,
          active: activeCoupons,
          expired: expiredCoupons,
          featured: featuredCoupons
        },
        users: userCount,
        engagement: {
          totalClicks,
          totalUsage
        }
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get recent activity (latest coupons, stores, etc.)
 * @route   GET /api/admin/recent-activity
 * @access  Private/Admin
 */
export const getRecentActivity = async (req, res) => {
  try {
    const recentCoupons = await Coupon.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('store', 'name')
      .populate('category', 'name');
    
    const recentStores = await Store.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    const recentCategories = await Category.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      success: true,
      activity: {
        recentCoupons,
        recentStores,
        recentCategories
      }
    });
  } catch (error) {
    console.error('Recent activity error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get all admin users
 * @route   GET /api/admin/users
 * @access  Private/Admin
 */
export const getAdminUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    console.error('Get admin users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Update featured status of coupons
 * @route   PUT /api/admin/coupons/:id/featured
 * @access  Private/Admin
 */
export const updateFeaturedStatus = async (req, res) => {
  try {
    const { featured } = req.body;
    
    if (featured === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Featured status is required'
      });
    }

    const coupon = await Coupon.findById(req.params.id);
    
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found'
      });
    }

    coupon.featured = featured;
    await coupon.save();

    res.status(200).json({
      success: true,
      message: `Coupon ${featured ? 'marked as featured' : 'removed from featured'}`,
      coupon
    });
  } catch (error) {
    console.error('Update featured status error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get analytics by store or category
 * @route   GET /api/admin/analytics/store/:storeId
 * @route   GET /api/admin/analytics/category/:categoryId
 * @access  Private/Admin
 */
export const getAnalytics = async (req, res) => {
  try {
    const { type, id } = req.params;
    let query = {};
    
    if (type === 'store') {
      query = { store: id };
    } else if (type === 'category') {
      query = { category: id };
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid analytics type'
      });
    }

    // Get coupons matching the query
    const coupons = await Coupon.find(query);
    
    // Calculate total clicks and usage
    const totalClicks = coupons.reduce((sum, coupon) => sum + coupon.clickCount, 0);
    const totalUsage = coupons.reduce((sum, coupon) => sum + coupon.usedCount, 0);
    
    // Get most popular coupon
    const mostPopularCoupon = coupons.length > 0 ? 
      coupons.reduce((prev, current) => (prev.clickCount > current.clickCount) ? prev : current) : null;

    res.status(200).json({
      success: true,
      analytics: {
        totalCoupons: coupons.length,
        totalClicks,
        totalUsage,
        conversionRate: totalClicks > 0 ? (totalUsage / totalClicks) * 100 : 0,
        mostPopularCoupon
      }
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Bulk update coupon status
 * @route   PUT /api/admin/coupons/bulk-status-update
 * @access  Private/Admin
 */
export const bulkUpdateCouponStatus = async (req, res) => {
  try {
    const { couponIds, status } = req.body;
    
    if (!couponIds || !Array.isArray(couponIds) || couponIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide coupon IDs'
      });
    }
    
    if (status === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    // Update all coupons matching the IDs
    const result = await Coupon.updateMany(
      { _id: { $in: couponIds } },
      { $set: { status } }
    );

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} coupons updated successfully`,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('Bulk update error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Update admin profile
 * @route   PUT /api/admin/profile
 * @access  Private/Admin
 */
export const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id; // Assuming user ID is available from auth middleware
    
    // Find the user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if email is already taken (if changing email)
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use'
        });
      }
    }
    
    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    
    await user.save();
    
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};