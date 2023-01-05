const express = require("express");
const router = express.Router();
const orderController = require("./../controller/orderController");

router
  .route("/")
  .get(orderController.getAllorders)
  .post(orderController.createOrder);

router
  .route("/:id")
  .get(orderController.getSingleOrder)
  .put(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
