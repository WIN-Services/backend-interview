const express = require("express");
const orderController = require('../controller/orderController')
const app = express.Router();

app.post('/create', orderController.createOrder)
app.get('/getall', orderController.getAllOrders)
app.get('/get', orderController.getOrder)
app.put('/update', orderController.updateOrder)
app.delete('/delete', orderController.deleteOrder)

module.exports = app;