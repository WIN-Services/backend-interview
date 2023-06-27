import express from 'express';
const router = express.Router();
import { createOrder, deleteOrder, getOrder, updateOrder } from "../controllers/orderController.js";
import { validate } from '../validators/validators.js'

router.post("/", validate('createOrder'), createOrder);
router.put("/:orderId", validate('updateOrder'), updateOrder);
router.get("/", validate('getOrder'), getOrder);
router.delete("/:orderId", validate('deleteOrder'), deleteOrder);

export default router;
