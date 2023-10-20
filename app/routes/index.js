const orderController = require("../controllers/order");
const orderServiceController = require("../controllers/orderService");
const { verifyUser } = require("../middlewares/auth");
const express = require("express");
var router = express.Router();

// get All Order : with pagination
// Ex: {BASE_URL}/api/order?page=1&pageSize=10 (default page-Size=10 & page=1)
router.get('/order', [verifyUser], orderController.getAllOrders);
// get Order by ID
router.get('/order/:id', [verifyUser], orderController.getOrderById);
// update Order
router.put('/order/:id', [verifyUser], orderController.updateOrder);
// delete Order
router.delete('/order/:id', [verifyUser], orderController.deleteOrder);
// create Order
router.post('/order', [verifyUser], orderController.createOrder);



// get All Services : with pagination
// Ex: {BASE_URL}/api/service?page=1&pageSize=10 (default page-Size=10 & page=1)
router.get('/service', [verifyUser], orderServiceController.getAllServices);
// get Service by ID
router.get('/service/:id', [verifyUser], orderServiceController.getServiceById);
// update Order
router.put('/service/:id', [verifyUser], orderServiceController.updateService);
// delete Order
router.delete('/service/:id', [verifyUser], orderServiceController.deleteService);
// create Order
router.post('/service', [verifyUser], orderServiceController.createService);

module.exports = router;