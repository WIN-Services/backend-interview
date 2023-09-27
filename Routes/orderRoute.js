const router = require('express').Router();
const OrderController = require('../Controllers/orderController')
const validateOrderTiming = require('../Middleware/VerifyOrder').validateTime()


router.get('/Orders', OrderController.listOrder);
router.post('/insertOrder', OrderController.createOrder);
router.get('/getOrder/byId', OrderController.findOrderById);
router.put('/updateOrder/byId',  OrderController.updateOrderById);
router.delete('/deleteOrder/byId', OrderController.deleteOrderById);


module.exports = router;