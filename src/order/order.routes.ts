import { addOrderController, getOrderController } from "./order.controller";
import express from "express";
const router = express.Router();

router.post('/order',addOrderController);
router.get("/order", getOrderController);

export default router;