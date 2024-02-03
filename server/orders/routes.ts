import express from "express";
import OrdersController from "./controller";
export default express
  .Router()
  .get("/getAllOrders", OrdersController.getAllOrders)
  .post("/createOrder", OrdersController.createOrder)
  .patch("/removeService", OrdersController.removeService)
  .post("/deleteOrder", OrdersController.deleteOrder);
