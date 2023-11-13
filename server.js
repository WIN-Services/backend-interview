const express = require('express');
const mongoose = require('mongoose');
const orders = require('./routes/orders');
const services = require('./routes/services');
require('dotenv').config();
const app = express();
app.use(express.json());

const connectDB = require('./config/db');

connectDB();
app.use('/api/v1/services',services);

app.use('/api/v1/orders',orders);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`API server started on ${port}`);
})

module.exports = app;