import { saveshortUrl } from "../dao/short_url.js"; 
import { verifyToken } from "../middleware/auth.middleware.js";
import {get} from "../utils/helper.js";  

export const shorturlserviceWithoutUser = async (url) => {
  const shortUrl = get(7);
   await saveshortUrl(shortUrl, url);
  return shortUrl;
};
export const shorturlserviceWithUser = async (url,slug,userId) => {
    const shortUrl = slug ? slug : get(7); 
   await saveshortUrl(shortUrl, url,userId);
   return shortUrl;
};