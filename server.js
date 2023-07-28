require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const initMongo = require("./config/mongo");
const morgan = require("morgan");

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

app.use(bodyParser.json());
app.use(require("./app/routes"));

initMongo();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port : ${process.env.PORT}`);
});

module.exports = app; // for testing
