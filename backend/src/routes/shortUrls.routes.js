import { Router } from "express";
import { shortUrlGenerator } from "../controller/shorturl.controller.js";
const router = Router();
router.post("/",shortUrlGenerator);
export default router;