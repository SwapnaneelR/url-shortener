import { Router } from "express";
import { shortUrlGenerator } from "../controller/shorturl.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

// Middleware that runs if token is present
const optionalAuth = (req, res, next) => {
  const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
  if (!token) return next(); // no token, skip auth
  // manually call verifyToken and let it populate req.user
  verifyToken(req, res, next);
};

router.post("/", optionalAuth, shortUrlGenerator);

export default router;
