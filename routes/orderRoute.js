const express = require('express');


const orderController = require('../controller/ordersController');
const router = express.Router();

router.get('/all', orderController.getAllOrders);
router.post('/', orderController.create);
router.get('/:orderId', orderController.getOrderById);
router.put('/:orderId', orderController.update);
router.delete('/:orderId', orderController.deleteOrderById);


module.exports = router;



