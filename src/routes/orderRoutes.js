const express = require('express');
const { createOrder, updateOrder, deleteOrder, getOrderById, getAllOrders, canUserCreateOrder } = require('../controllers/orderController');

const router = express.Router();

router.route('/')
.post(
    canUserCreateOrder,
    createOrder
)
.get(
    getAllOrders
);

router.route('/:orderId')
.put(
    updateOrder
)
.delete(
    deleteOrder
)
.get(
    getOrderById
);

module.exports = router;