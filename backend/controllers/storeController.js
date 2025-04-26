import Store from '../models/storeModel.js';

import { uploadToCloudinary,deleteFromCloudinary,getPublicId } from '../config/cloudinary.js';

/**
 * @desc    Create a new store
 * @route   POST /api/stores
 * @access  Private/Admin
 */
export const createStore = async (req, res) => {
  try {
    const { name } = req.body;
    let { totalCoupons } = req.body;
    let logo;
   

    if(req?.file)
    {
      try{
       

        const cloudinaryUrl=await uploadToCloudinary(req.file.path);
        logo=cloudinaryUrl.secure_url;

      }
      catch(err)
      {
        console.log(err);
      }
    }
    
    // Set default value for totalCoupons if not provided
    totalCoupons = totalCoupons || 0;

    // Validation
    if (!name || !logo) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name and logo'
      });
    }

    // Check if store already exists
    const storeExists = await Store.findOne({ name });
    if (storeExists) {
      return res.status(400).json({
        success: false,
        message: 'Store with this name already exists'
      });
    }

    // Create store
    const store = await Store.create({
        name,
        logo,
        totalCoupons:Number.parseInt(totalCoupons)
    });

    res.status(201).json({
      success: true,
      store
    });
  } catch (error) {
    console.error('Create store error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get all stores
 * @route   GET /api/stores
 * @access  Public
 */
export const getStores = async (req, res) => {
  try {
    const stores = await Store.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: stores.length,
      stores
    });
  } catch (error) {
    console.error('Get stores error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Get single store by ID
 * @route   GET /api/stores/:id
 * @access  Public
 */
export const getStoreById = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    res.status(200).json({
      success: true,
      store
    });
  } catch (error) {
    console.error('Get store error:', error);
    
    // Handle invalid ObjectId format
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Update store (logo and totalCoupons only)
 * @route   PUT /api/stores/:id
 * @access  Private/Admin
 */
export const updateStore = async (req, res) => {
  try {
    // Find store by id
    let store = await Store.findById(req.params.id);

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    // Extract only allowed fields for update
    const { totalCoupons } = req.body;
    let logo;
    if(req?.file)
    {
      const cloudinaryUrl=await uploadToCloudinary(req.file.path);
      


      if(store?.logo)
      {
        try{
          const public_id=getPublicId(store.logo);
          const result=await deleteFromCloudinary(public_id);
          
        }
        catch(er)
        {
          console.log(er);
        }
      }
      logo=cloudinaryUrl.secure_url;

    }
    
    // Create update object with only allowed fields
    const updateData = {};
    if (logo) updateData.logo = logo;
    if (totalCoupons !== undefined) updateData.totalCoupons = totalCoupons;

    // If name is in request body but we're not allowing it to be updated
    if (req.body.name && req.body.name !== store.name) {
      return res.status(400).json({
        success: false,
        message: 'Store name cannot be updated'
      });
    }

    // Update store with only the allowed fields
    store = await Store.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      store
    });
  } catch (error) {
    console.error('Update store error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

/**
 * @desc    Delete store
 * @route   DELETE /api/stores/:id
 * @access  Private/Admin
 */
export const deleteStore = async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);

    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    await Store.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Store deleted successfully'
    });
  } catch (error) {
    console.error('Delete store error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};