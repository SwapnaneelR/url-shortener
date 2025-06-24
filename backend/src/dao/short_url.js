import shorturlmodel from '../models/shorturl.model.js';
import User from '../models/user.model.js';

export const saveshortUrl = async (shortUrl, longUrl, userId = null) => {
  // Check if slug/shortUrl already exists
  const exists = await shorturlmodel.findOne({ short_url: shortUrl });

  if (exists) {
    throw new Error("Slug already in use. Please choose a different one.");
  }

  const newUrl = new shorturlmodel({
    short_url: shortUrl,
    full_url: longUrl,
  });

  // Associate with user if provided
  if (userId) {
    const user = await User.findById(userId);
    newUrl.user = user;
  }

  await newUrl.save();
};
