import { verifyToken } from "../middleware/auth.middleware.js";
import { shorturlserviceWithoutUser, shorturlserviceWithUser } from "../services/shorturl.service.js";

// Route with verifyToken as middleware (optional if needed)
export const shortUrlGenerator = async (req, res) => {
  try {
    const { slug } = req.body;
    const { url } = req.body;
    console.log("long url", url);

    const userId = req.user ? req.user._id : null; // set by middleware
    let short_url;

    if (userId) {
    
      console.log("User is logged in, generating user-specific short URL");
      short_url = await shorturlserviceWithUser(url, slug,userId);
    }
 
    if (!short_url) {
      short_url = await shorturlserviceWithoutUser(url);
    }

    return res.status(200).send(`${process.env.APP_ID}/${short_url}`);
  } catch (error) {
    console.error("Error generating short URL:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
