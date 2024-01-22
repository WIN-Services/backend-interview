const express = require('express');
const OrderController = require('../controller/order.controller');
const router = express.Router();
const orderController = new OrderController();

router.route('/create').post(orderController.createOrder());
router.route('/order').get(orderController.getOrderById());
router.route('/all-orders').get(orderController.getAllOrders());
router.route('/update-order').put(orderController.updateOrder());
module.exports = router;