import express from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';
const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected route example
router.get('/profile', verifyToken, (req, res) => {
    res.json({
        "message" : "Welcome to your profile",
         user: req.user });
});
 
router.post('/logout', logout);

export default router;