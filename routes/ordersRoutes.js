const express = require('express');
const { getAllOrders, getOrderById, createNewOrder, updateOrderById, deleteOrderById } = require('../controllers/ordersContollers');
const { orderIdParam, orderBodyInput } = require('../validators/orderValidators');
const authCheck = require('../middlewares/authCheck');

const router = express.Router();

router.get('/', getAllOrders);
router.get('/:id', orderIdParam, getOrderById);

// Authentication required with routes listed below.
router.use(authCheck);

router.post('/', orderBodyInput, createNewOrder);
router.put('/:id', orderIdParam, orderBodyInput, updateOrderById);
router.delete('/:id', orderIdParam, deleteOrderById);

module.exports = router;