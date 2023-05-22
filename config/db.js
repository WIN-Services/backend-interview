const mongoose = require("mongoose");
const config = require("./index");
const logger = require("../app/utils/logger");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const dbConnection = async () => {
  try {
    const mongooseConnection = await mongoose.connect(
      `mongodb+srv://${config["dbusername"]}:${config["dbpassword"]}@${config["dbcluster"]}/${config["dbname"]}?retryWrites=true&w=majority`,
      options
    );
    //if mongo atlas is down or error; connect to local mongodb
    if (!mongooseConnection) {
      mongoose.connect(
        `mongodb://localhost:27017/${config["dbname"]}`,
        options
      );
      logger.info("connected to local mongodb");
    } else {
      logger.info("connected to atlas mongo");
    }
  } catch (err) {
    console.log(err);
    logger.error("Error connecting to mongodb");
  }
};

module.exports = { dbConnection };
