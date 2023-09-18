const router = require('express').Router();

const controller = require('../controllers/order');

router.get('/get-all-orders', controller.getAllOrders);
router.get('/get-order', controller.getOrderById);

router.post('/create-order', controller.createOrder);

router.put('/update-order', controller.updateOrder);

router.delete('/delete-order', controller.deleteOrder);

module.exports = router;
