import { shorturlservice } from "../services/shorturl.service.js"; 
export const  shortUrlGenerator =  
  async (req,res)=>{
  const {url} = req.body;
  const {short_url} = await  shorturlservice(url);
  res.status(200).redirect(process.env.APP_ID+"/"+short_url);
} 