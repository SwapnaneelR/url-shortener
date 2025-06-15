import { shorturlserviceWithoutUser } from "../services/shorturl.service.js"; 
export const  shortUrlGenerator =  
  async (req,res)=>{
  const {url} = req.body; 
  console.log("long url",url);
  const short_url = await shorturlserviceWithoutUser(url);
  res.status(200).send(process.env.APP_ID+"/"+short_url);
} 