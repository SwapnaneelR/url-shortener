// Middleware to verify token from cookie
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }
        
        const decoded = jwt.verify(token, secret);
        const user = await User.findById(decoded.id);
        req.user = user;  
        next();
    } catch (error) {
        console.error('Token verification error:', error.message);
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};