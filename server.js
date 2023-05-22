const express = require("express");
const app = express();
const config = require("./config/index");
const { dbConnection } = require("./config/db");
const logger = require("./app/utils/logger");
//connecting to mongodb
dbConnection();

app.use(express.json());

// CORS Headers
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE,");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Welcome to Win Techincal Services",
    data: "NA",
  });
});

const orderRoutes = require("./app/routes/orderRoute");
app.use("api", orderRoutes);

const PORT = config["port"] || 7001;
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
