const mongoose = require("mongoose");
const DB_URL = process.env.MONGO_URI;
const loadModels = require("../app/models");

module.exports = () => {
  const connect = async () => {
    mongoose.Promise = global.Promise;

    try {
      mongoose.set("strictQuery", false);
      await mongoose.connect(DB_URL, {
        keepAlive: true,
        useNewUrlParser: true,
      });
      dbStatus = `*    DB Connection: OK\n****************************\n`;
      if (process.env.NODE_ENV !== "test") {
        // Prints initialization
        console.log("****************************");
        console.log("*    Starting Server");
        console.log(`*    Port: ${process.env.PORT || 443}`);
        console.log(`*    NODE_ENV: ${process.env.NODE_ENV}`);
        console.log(`*    Database: MongoDB`);
        console.log(dbStatus);
      }
    } catch (err) {
      let dbStatus = "";
      if (err) {
        dbStatus = `*    Error connecting to DB: ${err}\n****************************\n`;
      }
    }
  };
  connect();

  mongoose.connection.on("error", console.log);
  mongoose.connection.on("disconnected", connect);

  loadModels();
};
