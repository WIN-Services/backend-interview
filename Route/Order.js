const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/Order')
const validate = require('../middleware/validation')


router.post('/order/new',validate.validateTime , orderController.createOrder)
router.put('/order/:id' ,validate.validateTime , orderController.updateOrder)
router.get('/orders',orderController.getAllOrders)
router.get('/order/:id',orderController.getOrderById)
router.delete('/order/:id',orderController.deleteOrder)

module.exports = router;