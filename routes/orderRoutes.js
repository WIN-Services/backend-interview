const express = require('express');
const orderController = require('../controllers/orderController');
const validator = require('../middlewares/validator');

const  router = express.Router();

router.get('/', orderController.getAllOrders);
router.post('/', validator.orderValidator, orderController.createOrder);
router.get('/:id', orderController.getOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);


module.exports = router;