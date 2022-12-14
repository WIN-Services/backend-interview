const express = require('express');
const connectDB = require('./database/Mongodb');
const dotenv = require('dotenv');
const app = express();

//Load environment variables from env
require("dotenv/config");

//Connecting mongodb
connectDB();

//Midllewares
app.use(express.json());

//Importing Routes
const orderRoute=require('./routes/OrderRouter')
const serviceRoute=require('./routes/ServiceRouter')

//Routes middlewares
app.use('/api/order',orderRoute);
app.use('/api/service',serviceRoute );

//Starting server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`The app is listening on port ${port}`));

module.exports = app;