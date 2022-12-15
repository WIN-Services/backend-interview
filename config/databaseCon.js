const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

// Connect to mongodb cluster
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/win", {
      useNewUrlParser: true,
    });
    console.log("Connected to the mongoDB");
  } catch (err) {
    console.log(err.message);
    return done(err);
  }
};

module.exports = connectDB;