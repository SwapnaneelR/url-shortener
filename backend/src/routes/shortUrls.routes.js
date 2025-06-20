import { Router } from "express";
import {shortUrlGenerator}  from "../controller/shorturl.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
const router = Router();
router.post("/",verifyToken,shortUrlGenerator);
export default router;