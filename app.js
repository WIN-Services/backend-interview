// app.js
const express = require('express');
const bodyParser = require('body-parser');
const orderController = require('./controllers/orderController');

const app = express();

// Middleware to parse JSON data from the request body
app.use(bodyParser.json());

// Endpoints
app.post('/orders', orderController.createOrder);
app.put('/orders/:orderId', orderController.updateOrder);
app.delete('/orders/:orderId', orderController.deleteOrder);
app.get('/orders', orderController.getAllOrders);

module.exports = app;
