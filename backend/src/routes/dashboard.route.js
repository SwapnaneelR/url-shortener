import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
// import  User from "../models/user.model.js"
import  shorturlmodel from "../models/shorturl.model.js"
const router = express.Router();

router.get("/",verifyToken, async (req, res) => {
//   res.send("Welcome to the Dashboard");
    const userId = req.user.id; // Assuming req.user is set by verifyToken middleware
    
    const allUrls = await shorturlmodel.find({ user: userId });
    res.status(200).json({
        success: true,
        message: "All URLs fetched successfully",
        data: allUrls
    })
    shorturlmodel.find    
}
);

export default router;