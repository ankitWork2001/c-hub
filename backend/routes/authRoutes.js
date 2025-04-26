import express from 'express';
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

// Register a new user
router.post('/signup', signup); // POST /api/auth/signup

// Authenticate user & get token
router.post('/login', login); // POST /api/auth/login

export default router;
