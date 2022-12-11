const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");

router.get("/:id", orderController.getOrder);
router.get("/", orderController.getAllOrders);
router.post("/", orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;