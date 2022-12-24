import mongoose from "mongoose";

export const db = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/services"
    );

    console.log("Mongodb connected successfully.");
  } catch (error) {
    console.log("Database connection error: ", error);
  }
};
