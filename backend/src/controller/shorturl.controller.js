import { shorturlserviceWithUser, shorturlserviceWithoutUser } from "../services/shorturl.service.js";

export const shortUrlGenerator = async (req, res) => {
  try {
    const { slug, url } = req.body;
    if (!url) return res.status(400).json({ message: 'URL is required' });

    const userId = req.user?._id;
    let short_code;

    try {
      if (userId) {
        short_code = await shorturlserviceWithUser(url, slug, userId);
      } else {
        short_code = await shorturlserviceWithoutUser(url);
      }
    } catch (err) {
      // Handle duplicate slug / DAO errors
      if (err.code === 'DUPLICATE_SLUG' || (err.message && err.message.includes('Slug already in use'))) {
        return res.status(409).json({ message: 'Slug already in use' });
      }
      console.error('Error in service/DAO:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

  // Return the full short URL string (frontend expects the string)
  // Hardcoded production frontend URL per request
  return res.status(200).send(`https://shorturl-rust-xi.vercel.app/${short_code}`);
  } catch (error) {
    console.error("Error generating short URL:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
