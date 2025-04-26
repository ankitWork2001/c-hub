import {
  uploadToCloudinary,
  deleteFromCloudinary,
  getPublicId,
} from "../config/cloudinary.js";
import Category from "../models/categoryModel.js";

/**
 * @desc    Create a new category
 * @route   POST /api/categories
 * @access  Private/Admin
 */
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    let { totalCoupons } = req.body;

    let image;

    if (req?.file) {
      try {
        const cloudinaryUrl = await uploadToCloudinary(req.file.path);
        image = cloudinaryUrl.secure_url;
      } catch (err) {
        console.log(err);
      }
    }

    // Set default value for totalCoupons if not provided
    totalCoupons = totalCoupons || 0;

    // Validation
    if (!name || !image) {
      return res.status(400).json({
        success: false,
        message: "Please provide name and image",
      });
    }

    // Check if category already exists
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({
        success: false,
        message: "Category with this name already exists",
      });
    }

    // Create category
    const category = await Category.create({
      name,
      image,
      totalCoupons,
    });

    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    console.error("Create category error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Public
 */
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * @desc    Get single category by ID
 * @route   GET /api/categories/:id
 * @access  Public
 */
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.error("Get category error:", error);

    // Handle invalid ObjectId format
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * @desc    Update category (image and totalCoupons only)
 * @route   PUT /api/categories/:id
 * @access  Private/Admin
 */
export const updateCategory = async (req, res) => {
  try {
    // Find category by id
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Extract only allowed fields for update
    const { totalCoupons } = req.body;

    let image;
    if (req?.file) {
      const cloudinaryUrl = await uploadToCloudinary(req.file.path);

      if (category?.image) {
        try {
          const public_id = getPublicId(category.image);
          const result = await deleteFromCloudinary(public_id);
        } catch (er) {
          console.log(er);
        }
      }
      image = cloudinaryUrl.secure_url;
    }

    // Create update object with only allowed fields
    const updateData = {};
    if (image) updateData.image = image;
    if (totalCoupons !== undefined) updateData.totalCoupons = totalCoupons;

    // If name is in request body but we're not allowing it to be updated
    if (req.body.name && req.body.name !== category.name) {
      return res.status(400).json({
        success: false,
        message: "Category name cannot be updated",
      });
    }

    // Update category with only the allowed fields
    category = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    console.error("Update category error:", error);

    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * @desc    Delete category
 * @route   DELETE /api/categories/:id
 * @access  Private/Admin
 */
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Delete category error:", error);

    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
