const mongoDB = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongo_url=process.env.MONGO_URL || "mongodb://localhost:27017/order_management"
const connectDB = async () => {
  try {
    await mongoDB.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb is connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
