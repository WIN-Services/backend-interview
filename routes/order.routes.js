const orderController = require("../controllers/order.controller");

module.exports = (app) => {
  var router = require("express").Router();

  router.post("/order/create", orderController.createOrder);
  router.get("/order/:order_id", orderController.getOrderById);
  router.get("/order", orderController.getAllOrders);
  router.put("/order/update", orderController.updateOrders);
  router.delete("/order/:order_id", orderController.deleteOrders);

  app.use("/api", router);
};
