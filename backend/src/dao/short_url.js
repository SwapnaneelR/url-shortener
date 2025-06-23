import shorturlmodel from '../models/shorturl.model.js';
import User from '../models/user.model.js';
export const saveshortUrl = async (shortUrl, longUrl,userId) => {
    const newUrl = new shorturlmodel({
        short_url : shortUrl,
        full_url : longUrl,
    })
    if(userId) {
        const user = await User.findById(userId);
        newUrl.user = user;
    }
    await newUrl.save();
}