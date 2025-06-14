import shorturlmodel from "../models/shorturl.model.js";
import {get} from "../utils/helper.js";  
export const shorturlservice = async (url) => {
  const shortUrl = get(7);
  const newUrl = new shorturlmodel({
    full_url: url,
    short_url: shortUrl,
    clicks: 0,
  });
  await newUrl.save();
  return newUrl;
};
