const express = require("express");
const orderRouter = express.Router();
const authentication = require("../middleware/verifyToken");
const OrderController = require("../controllers/orders.controller")

//ADD AN ORDER
orderRouter.post("/order", authentication.isAdmin, OrderController.addOrder);

//GET ORDER BY ID
orderRouter.get("/order/:id", OrderController.getSingleOrders);

//GET ALL ORDERS
orderRouter.get("/orders", authentication.isAdmin, OrderController.getAllOrders);

//UPDATE AN ORDER
orderRouter.put("/order/:id", authentication.isAdmin, OrderController.updateOrder);

//DELETE AN ORDER
orderRouter.delete("/order/:id", authentication.isAdmin, OrderController.deleteOrder);

module.exports = orderRouter;
