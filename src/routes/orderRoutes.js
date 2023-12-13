const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

// CRUD endpoints for orders
router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);
router.get('/', orderController.getAllOrders);

module.exports = router;
