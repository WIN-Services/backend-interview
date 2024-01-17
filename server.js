const mongoose = require("mongoose")

require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const rateLimiter = require("express-rate-limit");

const serviceRoutes = require('./routes/serviceRoutes')
const orderRoutes = require('./routes/orderRoutes')

const rateLimit = rateLimiter({
    windowMs: 60 * 1000,
    max: 5,
    message: "You have exceeded your 5 requests per minute limit.",
    headers: true,
  });


app.use(rateLimit);
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));

mongoose.connect(process.env.DB_URL)

// Routes
app.use('/service', serviceRoutes);
app.use('/order', orderRoutes);


module.exports = app