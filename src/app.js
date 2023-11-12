const express = require('express');

const app = express();

app.use(express.json());

const orderRoutes = require('./routes/order.router');
app.use('/', orderRoutes);

module.exports = app;