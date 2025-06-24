import { shorturlserviceWithUser, shorturlserviceWithoutUser } from "../services/shorturl.service.js";
export const shortUrlGenerator = async (req, res) => {
  try {
    const { slug, url } = req.body;
    console.log("long url", url);

    const userId = req.user?._id;
    console.log("User ID from request:", userId);
    let short_url;

    if (userId) {
      console.log("User is logged in, generating user-specific short URL");
      short_url = await shorturlserviceWithUser(url, slug, userId);
    } else {
      console.log("User is not logged in, generating public short URL");
      short_url = await shorturlserviceWithoutUser(url,null,null);
    }

    return res.status(200).send(`${process.env.APP_ID}/${short_url}`);
  } catch (error) {
    console.error("Error generating short URL:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
