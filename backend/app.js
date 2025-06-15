import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
const app = express();

import connectDB from "./src/config/mongo.config.js";
import shorturlmodel from "./src/models/shorturl.model.js";
import shorturl_router from "./src/routes/shortUrls.routes.js";

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use("/api/create", shorturl_router);
 
// app.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   console.log("Received request for ID:", id);

//   try {
//     const data = await shorturlmodel.findOne({ short_url: id });
//     if (!data) {
//       return res.status(404).send("URL not found");
//     }

//     console.log("Data found:", data);
 
//     data.clicks = (data.clicks || 0) + 1;
//     await data.save();
 
//     return res.redirect(data.full_url);
//   } catch (err) {
//     console.error("Error fetching URL:", err);
//     return res.status(500).send("Server error");
//   }
// });
 
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Received request for ID:", id);

  try {
    const allData = await shorturlmodel.find();
    console.log("All URLs in DB:", allData);

    const data = await shorturlmodel.findOne({ short_url: id });
    console.log("Result of DB query:", data);

    if (!data) {
      return res.status(404).send("URL not found");
    }

    data.clicks = (data.clicks || 0) + 1;
    await data.save();
    return res.redirect(data.full_url);
  } catch (err) {
    console.error("Error fetching URL:", err);
    return res.status(500).send("Server error");
  }
});
app.get("/", (req, res) => {
  res.send("Welcome to the URL Shortener Service");
});
 
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
