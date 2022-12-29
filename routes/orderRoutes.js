const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/orderController');

router.route('/create').post(OrderController.createOrder);
router.route('/all').get(OrderController.getAllOrders);
router.route('/:id').get(OrderController.getOrder);
router.route('/update/:id').put(OrderController.updateOrder);
router.route('/delete/:id').delete(OrderController.deleteOrder);


module.exports = router;