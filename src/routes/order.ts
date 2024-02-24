import { Router } from "express";
import {
  addOrder,
  getOrders,
  getOrderById,
  deleteOrder,
  updateOrder,
} from "../controllers/order";

const orderRoutes: Router = Router();

orderRoutes.get("/", getOrders);
orderRoutes.get("/:orderId", getOrderById);
orderRoutes.post("/", addOrder);
orderRoutes.delete("/:orderId", deleteOrder);
orderRoutes.patch("/:orderId", updateOrder);

export default orderRoutes;
