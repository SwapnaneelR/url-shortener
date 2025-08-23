import shorturlmodel from '../models/shorturl.model.js';
import User from '../models/user.model.js';
import mongoose from 'mongoose';

export const saveshortUrl = async (shortUrl, longUrl, userId = null) => {
  // Check if slug/shortUrl already exists
  const exists = await shorturlmodel.findOne({ short_url: shortUrl });

  if (exists) {
    // Let controller handle conflicts via thrown error
    err.code = 'DUPLICATE_SLUG';
    throw  new Error('Slug already in use. Please choose another one.');
  }

  const newUrl = new shorturlmodel({
    short_url: shortUrl,
    full_url: longUrl,
    clicks: 0,
  });

  // Associate with user if provided (store ObjectId)
  if (userId) {
    const user = await User.findById(userId);
    if (!user) {
      const err = new Error('User not found');
      err.code = 'USER_NOT_FOUND';
      throw err;
    }
  // Assign the user's ObjectId directly; Mongoose will cast it correctly
  newUrl.user = user._id;
  }

  const saved = await newUrl.save();
  return saved;
};
