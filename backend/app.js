import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cors from "cors";
const app = express();

import connectDB from "./src/config/mongo.config.js";
import shorturlmodel from "./src/models/shorturl.model.js";
import shorturl_router from "./src/routes/shortUrls.routes.js";
import router from "./src/routes/auth.route.js";
import cookieParser from "cookie-parser";
import dashboard_router from "./src/routes/dashboard.route.js";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Allow production frontend origin and credentials. Hardcoded per request.
app.use(cors({
  origin: "https://shorturl-rust-xi.vercel.app",
  credentials: true,
}));

// Explicitly set CORS headers as an extra safeguard (hardcoded production origin)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://shorturl-rust-xi.vercel.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(cookieParser());

app.use("/api/create", shorturl_router);
app.use("/api/auth", router);
app.use("/api/dashboard",dashboard_router);

app.get("/test", (req, res) => {
  const cookies = req.cookies;
  console.log("Cookies: ", cookies);
  res.send("Cookies received" + JSON.stringify(cookies));
});
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Received request for ID:", id);

  try { 

    const data = await shorturlmodel.findOne({ short_url: id }); 

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
 
const port = process.env.PORT || 3002;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log("Server is running on localhost:" + port);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
