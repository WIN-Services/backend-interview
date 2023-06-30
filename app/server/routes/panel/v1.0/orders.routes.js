"use strict";

const express = require("express");
const OrderManagementRoute = express.Router();
const {
  creatingOrder,
  deleteOrder,
  updateOrder,
  getOrders
} = require("../../../controllers/panel/orderManager");

OrderManagementRoute.post("/createOrder", creatingOrder);
OrderManagementRoute.put("/updateOrder/:id", updateOrder);
OrderManagementRoute.delete("/deleteOrder/orderId/:id", deleteOrder);
OrderManagementRoute.delete("/deleteOrder/userId/:id", deleteOrder);
OrderManagementRoute.get("/getOrders/orderId/:id", getOrders);
OrderManagementRoute.get("/getOrders/userId/:id", getOrders);



module.exports = OrderManagementRoute;