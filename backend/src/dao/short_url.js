import shorturlmodel from '../models/shorturl.model.js';
export const saveshortUrl = async (shortUrl, longUrl,userId) => {
    const newUrl = new shorturlmodel({
        short_url : shortUrl,
        full_url : longUrl,
    })
    if(userId) {
        newUrl.user = userId;
    }
    await newUrl.save();
}