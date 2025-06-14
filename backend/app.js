import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
const app = express();
import { nanoid } from "nanoid";
import connectDB from "./src/config/mongo.config.js";  
import shorturlmodel from "./src/models/shorturl.model.js";
import shorturl_router from "./src/routes/shortUrls.routes.js";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/create",shorturl_router)

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