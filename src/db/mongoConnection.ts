import mongoose from "mongoose";
import { MONGO_URL } from "../config";
console.log(MONGO_URL);
const connectDB = async () => {
  try {
    await mongoose.set('debug',true).connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb is connected");
  } catch (err) {
    console.error('MongoDb connection error:', err);
  }
};

export default connectDB;