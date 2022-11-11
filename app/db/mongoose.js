const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`MONGO DB CONNECTED :${conn.connection.host}`);
};

module.exports = connectDB;
