const express = require("express");
const router = express.Router();
const OrderUtils = require("../validators/orders/check_existing_orders");
const ServiceUtils = require("../validators/services/check_existing_services");
const orderController = require("../controllers/order_controller");

router.post("/", ServiceUtils.checkIfServiceExists, OrderUtils.getServiceOrdersBeforeThreeHours, orderController.createOrder);
router.get("/:id", orderController.getOrder);
router.get("/", orderController.getAllOrders);
router.put("/:id",ServiceUtils.checkIfServiceExists, OrderUtils.getServiceOrdersBeforeThreeHours, orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;