import express from 'express';
import { 
  createStore, 
  getStores, 
  getStoreById, 
  updateStore, 
  deleteStore 
} from '../controllers/storeController.js';
import {authenticate} from '../middleware/authMiddleware.js';
import {upload} from "../config/cloudinary.js"; 

const router = express.Router();

// Route to create a new store (Private/Admin)
router.post('/',authenticate,upload.single('logo') ,createStore);

// Route to get all stores (Public)
router.get('/', getStores);

// Route to get a single store by ID (Public)
router.get('/:id', getStoreById);

// Route to update a store (Private/Admin)
router.put('/:id',authenticate,upload.single('logo'), updateStore);

// Route to delete a store (Private/Admin)
router.delete('/:id',authenticate, deleteStore);

export default router;