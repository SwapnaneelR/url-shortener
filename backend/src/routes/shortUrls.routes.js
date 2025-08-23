import { Router } from "express";
import { shortUrlGenerator } from "../controller/shorturl.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

// Middleware that runs if token is present
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers?.authorization;
  const tokenFromHeader = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
  const token = req.cookies?.token || tokenFromHeader;
  if (!token) return next(); // no token, skip auth
  // manually call verifyToken and let it populate req.user
  return verifyToken(req, res, next);
};

router.post("/", optionalAuth, shortUrlGenerator);

export default router;
