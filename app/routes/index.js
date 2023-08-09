const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const serviceController = require("../controllers/serviceController");

router.get("/orders", orderController.getOrderList);
router.post("/order/create", orderController.createOrder);
router.post("/service/create", serviceController.createService);
// Add other routes for creating, updating, and deleting orders

module.exports = router;
