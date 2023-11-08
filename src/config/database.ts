import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGODB_URI ||
        'mongodb://localhost:27017/win-backend-interview',
      {} as mongoose.ConnectOptions
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log('MongoDB Connection Error:', err);
    process.exit(1);
  }
};
