import express from 'express';
import { 
  createCategory, 
  getCategories, 
  getCategoryById, 
  updateCategory, 
  deleteCategory 
} from '../controllers/categoryController.js';
import {authenticate} from '../middleware/authMiddleware.js';
import { upload } from '../config/cloudinary.js';


const router = express.Router();

// Create a new category (Private/Admin)
router.post('/',authenticate,upload.single('image'), createCategory); // POST /api/categories

// Get all categories (Public)
router.get('/',getCategories); // GET /api/categories

// Get single category by ID (Public)
router.get('/:id', getCategoryById); // GET /api/categories/:id

// Update category (Private/Admin)
router.put('/:id',authenticate,upload.single('image'), updateCategory); // PUT /api/categories/:id

// Delete category (Private/Admin)
router.delete('/:id',authenticate, deleteCategory); // DELETE /api/categories/:id

export default router;
