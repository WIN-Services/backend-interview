import express from "express";
import { getAllOrders, addNewOrder, getOrderById, deleteOrderById, updateOrder } from "../Controllers/orders.controller";
const router = express.Router();

router.get('/',getAllOrders);

router.get('/:id', getOrderById);

router.post('/', addNewOrder);

router.delete('/:id', deleteOrderById);

router.put('/:id', updateOrder);

export default router;
