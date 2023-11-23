const express = require("express");

const router = express.Router();
const orderController = require("../controller/orderController");

router.get("/orders", orderController.getAllOrders);
router.get("/orders/:id", orderController.getOrderById);
router.post("/orders", orderController.createOrders);
router.put("/orders/:id", orderController.updateOrderById);
router.delete("/orders/:id", orderController.deleteOrderById);

module.exports = router;
