import { Router } from "express";
import { createNewOrder, deleteOrder, getAllOrders, getSingleOrder, updateOrder } from "../controller/index.controller";

const router = Router();

//getting all the orders
router.get("/getAllOrders", getAllOrders);

//getting a single order
router.get('/getSingleOrder/:orderId',getSingleOrder)

//creating a new order
router.post('/createNewOrder', createNewOrder)

//updating a order
router.put('/updateOrder/:orderId',updateOrder)

//delete a order
router.delete('/deleteOrder/:orderId',deleteOrder)

export default router;
