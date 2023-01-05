const express = require("express");
const { json } = require("express");

const orderRouter = require("./routes/orderRoutes");

const app = express();

//MIDDLEWARE
app.use(express.json());

app.use("/orders", orderRouter);

module.exports = app;
