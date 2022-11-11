const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");

router.post("/create", orderController.addOrder);
router.put("/update/:orderId", orderController.updateOrder);
router.delete("/delete/:orderId", orderController.deleteOrder);
router.get("/all", orderController.allOrder);
router.get("/filter", orderController.getOrdersByFilters);

module.exports = router;
