const express = require("express");
const router = express.Router();
const middleware = require("../config/auth");
const orderController = require("../controllers/orderController");

router.get("/orders/getall", middleware.auth, orderController.getAllOrders);

router.get(
  "/orders/get/:orderId",
  middleware.auth,
  orderController.getOneOrder
);

router.post("/orders/post", middleware.auth, orderController.postOrders);

router.put("/orders/update", middleware.auth, orderController.getAllOrders);

router.delete("/orders/delete", middleware.auth, orderController.getAllOrders);

module.exports = router;
