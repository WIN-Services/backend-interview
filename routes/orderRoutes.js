const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");

// Create an Order
router.post("/", OrderController.createOrder);

// Read all Orders
router.get("/", OrderController.getAllOrders);

// Read order by Id
router.get("/:id", OrderController.getOrderById);

// Update an Order by ID
router.put("/:id", OrderController.updateOrder);

// Delete an Order by ID
router.delete("/:id", OrderController.deleteOrder);

module.exports = router;
