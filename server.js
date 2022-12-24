require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

//connect to database
mongoose
  .connect(process.env.DB_link)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log(`Database connection error: ${err.message}`));

// Middleware for parsing the body of the request
app.use(express.json());

// Import the routes for the "order" resource
const orderRoutes = require('./routes/order');
app.use('/order', orderRoutes);    

// Import the routes for the "service" resource
const serviceRoutes = require('./routes/service');
app.use('/service', serviceRoutes);

// connect to the server
const server = app.listen(process.env.PORT, function () {
  console.log("Server Started at " + process.env.PORT);
});

module.exports = server;
