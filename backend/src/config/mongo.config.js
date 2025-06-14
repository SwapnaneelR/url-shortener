import mongoose from "mongoose";

const connectDB = async () => {
  try { 
    mongoose.set("debug", true);

    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
 
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,  
    };

    await mongoose.connect(mongoURI, options);

    console.log("✅ MongoDB connected successfully");
    console.log("Connection String:", mongoURI);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
