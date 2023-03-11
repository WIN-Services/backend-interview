const express = require('express');
const router = express.Router();

const validation = require('../middleware/validation');
const orderController = require('../controllers/order');

router.get('/order/:id', orderController.getOrderById)
router.get('/orders', orderController.getAllOrders)
router.post('/order', validation.validateOrderVO, orderController.createOrder)
router.put('/order/:id' , validation.validateOrderVO, orderController.updateOrder)
router.delete('/order/:id', orderController.deleteOrder)

module.exports = router;