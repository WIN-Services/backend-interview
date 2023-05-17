const express = require("express");
const router = express.Router();
const middleware = require("../config/auth");
const orderController = require("../controllers/orderController");

router.get("/orders/getall", middleware.auth, orderController.getAllOrders);
router.get("/orders/geta", middleware.auth, orderController.getOneOrder);

router.get("/orders/getall", middleware.auth, orderController.getAllOrders);

router.get("/orders/getall", middleware.auth, orderController.getAllOrders);

router.get("/orders/getall", middleware.auth, orderController.getAllOrders);

module.exports = router;
