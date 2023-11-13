const express = require('express');
const router = express.Router()


const { getOrders, getOrderById, createOrder, updateOrderById, deleteOrderById } = require('../controllers/orders');


router.get('/',getOrders)

router.get('/:id',getOrderById)

router.post('/',createOrder)

router.put('/:id',updateOrderById)

router.delete('/:id',deleteOrderById)

module.exports = router;