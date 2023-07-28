// app.js
const express = require('express');
const bodyParser = require('body-parser');
const orderController = require('./controller/orderController');
const serviceController = require('./controller/serviceController');

const app = express();

// Middleware to parse JSON data from the request body
app.use(bodyParser.json());

// Endpoints

app.post('/orders', orderController.createOrder);
app.get('/orders/:orderId', orderController.getOrderById);
app.put('/orders/:orderId', orderController.updateOrder);
app.delete('/orders/:orderId', orderController.deleteOrder);
app.get('/orders', orderController.fetchAllOrders);
app.get('/services', serviceController.getAllServices);
app.post('/services',serviceController.createService);
app.get('/services/:serviceId',serviceController.getServiceById);
app.put('/services/:serviceId',serviceController.updateService);
app.delete('/services/:serviceId',serviceController.deleteService);

module.exports = app;