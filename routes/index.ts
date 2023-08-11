import { Router } from "express";
import {
  createNewOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
} from "../controller/index.controller";
import {
  validateCreateOrder,
  validateDeleteOrder,
  validateSingleOrder,
  validateUpdateOrder,
} from "../middleware/index.middleware";

const router = Router();

//getting all the orders
router.get("/getAllOrders", getAllOrders);

//getting a single order
router.get("/getSingleOrder/:orderId", validateSingleOrder, getSingleOrder);

//creating a new order
router.post("/createNewOrder", validateCreateOrder, createNewOrder);

//updating a order
router.put("/updateOrder/:orderId", validateUpdateOrder, updateOrder);

//delete a order
router.delete("/deleteOrder/:orderId", validateDeleteOrder, deleteOrder);

export default router;
