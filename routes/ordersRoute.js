const express = require('express');
const app = express();
const orderController = require('../controller/orderController');
app.get('/', orderController.fetchAllOrders);
app.post('/', orderController.createOrder);
app.put('/:orderId', orderController.updateOrder);
app.delete('/:orderId', orderController.deleteOrder);