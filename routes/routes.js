const express = require('express');
const orderController = require('../controllers/orderController.js');

const router = express.Router();

router.get('/order/get/all', orderController.getAllOrders);
router.put('/order/get/:id', orderController.getOrderById);
router.post('/order/create', orderController.createOrder);
router.put('/order/update/:id', orderController.updateOrder);
router.delete('/order/delete/:id', orderController.deleteOrder);

module.exports = router;