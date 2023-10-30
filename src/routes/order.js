const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order");

router.get("/", orderController.fetchAllOrderDetails);
router.post("/", orderController.placeOrder);
router.get("/:orderId", orderController.fetchOrderDetails);
router.delete("/:orderId", orderController.deleteOrder);
router.patch("/:orderId", orderController.updateOrder);

module.exports = router;
