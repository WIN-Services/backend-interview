const express = require('express');

const router= express.Router();

const {getOrders , createOrders , getSpecificOrders, deleteOrder,updateOrder} = require('../Controller/orderController')

router.get('/orders', getOrders);
router.post('/orders', createOrders);
router.get('/orders/:id', getSpecificOrders);
router.delete('/orders/:id',deleteOrder);
router.put('/orders/:id',updateOrder);

module.exports = router;