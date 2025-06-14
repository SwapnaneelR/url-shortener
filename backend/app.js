import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
const app = express();
import { nanoid } from "nanoid";
import connectDB from "./src/config/mongo.config.js";  
import shorturlmodel from "./src/models/shorturl.model.js";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/create",(req,res)=>{
  const {url} = req.body;
  const shortUrl = nanoid(7);
  const newUrl = new shorturlmodel({
    full_url: url,
    short_url: shortUrl,
    clicks: 0,
  });
  newUrl.save();
})
app.get("/:id" , async (req, res) => {
  const { id } = req.params;
  try {
    const url = await shorturlmodel.findOne({ short_url: id });
    if (url) {
      url.clicks += 1;
      url.save();
      return res.redirect(url.full_url);
    }
  } catch (err) { 
    return res.status(500).json({ error: "Internal Server Error" });
  }
})

app.use("/",(req,res)=>{
  res.send("home "); 
})
const startServer = async () => {
  try {
    await connectDB(); 
    app.listen(5000, () => {
      console.log("Server is running on http://localhost:5000");
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();