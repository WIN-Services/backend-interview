const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./src/connection");
const serviceRoutes = require('./src/routes/services.route')
const orderRoutes = require('./src/routes/order.route')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

connection.createMongoConnection();
const dbConnection = connection.getMongoConnection();
dbConnection.on("error", connection.onError);
dbConnection.on("open", connection.onSuccess);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/orders", orderRoutes);
app.use("/services",serviceRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports =  app ;
