import express from 'express';
import { register, login, logout, verifyToken } from '../controllers/auth.controller.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route example
router.get('/profile', verifyToken, (req, res) => {
    res.json({ user: req.user });
});
 
router.post('/logout', logout);

export default router;