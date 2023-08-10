const express = require('express');
const orderController = require('./orderController');

const router = express.Router();


// Route - /orders
router.route('/')
.post(
    orderController.checkUserPermission('admin'),
    orderController.canUserCreateOrder,
    orderController.computeOdersTotalFee,
    orderController.createOrder,
)
.get(
    orderController.checkUserPermission('user','admin'),
    orderController.fetchAllOrders,
);

// Route - /orders/:id
router.route('/:id')
.put(
    orderController.checkUserPermission('admin'),
    orderController.computeOdersTotalFee,
    orderController.updateOrderById,
)
.get(
    orderController.checkUserPermission('user','admin'),
    orderController.fetchOrderById,
)
.delete(
    orderController.checkUserPermission('admin'),
    orderController.deleteOrderById,
);

module.exports = router;