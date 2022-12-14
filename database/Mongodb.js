const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

// Connect to mongodb cluster
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
    });
    console.log("Connected to the mongoDB");
  } catch (err) {
    console.log(err.message);
    return done(err);
  }
};

module.exports = connectDB;
