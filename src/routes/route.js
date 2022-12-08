const express = require('express');
const router = express.Router();


const orderController = require('../controllers/orderController');

router.get('/order', orderController.getAllOrder);
router.post('/order', orderController.createOrder);
router.get('/order/:orderId', orderController.getOrders);
router.put('/order/:orderId', orderController.updateOrder);
router.delete('/order/:orderId', orderController.deleteOrder);



const serviceController = require('../controllers/serviceController');

router.post("/service", serviceController.createService);
router.put("/service/:serviceId", serviceController.updateService);
router.delete("/service/:serviceId", serviceController.deleteService);
router.get("/service", serviceController.getAllService);


module.exports = router;