const express = require("express");
const router = express.Router();
const {
    createOrder,
    getAllOrders,
    getOrderById,
    deleteOrderById,
    updateOrderById
} = require("../controller/order.controller");

/**
 * CRUD for orders
 */
router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrderById);
router.delete("/:id", deleteOrderById);


module.exports = router;
