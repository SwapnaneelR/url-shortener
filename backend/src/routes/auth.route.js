import express from 'express';
import { register, login, logout, getMe } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route example
router.get('/me',getMe);
 
router.post('/logout', logout);

export default router;