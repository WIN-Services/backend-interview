import mongoose from 'mongoose';
import 'dotenv/config';
const MONGODB_URL = process.env.MONGODB_URL;

export async function createMongoDBConnection() {
  try {
    mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, dbName: process.env.DB_NAME });
    console.log("MongoDB connected successfully");

  } catch (error) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}
