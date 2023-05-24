const express = require("express");
const routes = express.Router();
let order = require("../services/order")

routes.post("/order",order.createOrder)
routes.get("/order/:id",order.getOrderById)
routes.put("/order/:id",order.updateOrder)
routes.delete("/order/:id",order.deleteOrder)
routes.get("/orders",order.getAllOrders)

module.exports = routes;