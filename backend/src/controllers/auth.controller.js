import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";

const generateToken = (payload) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign(payload, secret, { expiresIn: '1h' });
};

// Set cookie with token
const setTokenCookie = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure in production
        sameSite: 'Lax',
        maxAge: 3600000, // 1 hour in milliseconds
    });
};

// REGISTER
export const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(409).json({ message: 'Username already exists' });
            }
            if (existingUser.email === email) {
                return res.status(409).json({ message: 'Email already exists' });
            }
        }
        console.log('Creating new user:', { username, email });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        const token = generateToken({ 
            id: newUser._id, 
            username: newUser.username,
            email: newUser.email 
        });

        // Set cookie
        setTokenCookie(res, token);

        return res.status(201).json({ 
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email
            },
            message: 'Registration successful'
        });
    } catch (error) {
        console.error('Registration error:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// LOGIN
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken({ 
            id: user._id, 
            username: user.username,
            email: user.email 
        });

        // Set cookie
        setTokenCookie(res, token);

        return res.status(200).json({ 
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            message : 'Login successful'
        });
    } catch (error) {
        console.error('Login error:', error.message);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// LOGOUT
export const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path : "/"
    });
    return res.status(200).json({ message: 'Logged out successfully' });
};

// ME 
export const getMe = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        res.status(200).json({
            user: {
                id: decoded.id,
                username: decoded.username,
                email: decoded.email
            }
        });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};
