// here we use mongodb-memory-server for testing the db 
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

exports.dbConnect = async () => {
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  mongoose.connect(uri, (error) => {
    if (error) {
      throw error;
    } else {
      console.log("Database connection established.");
    }
  });
};

