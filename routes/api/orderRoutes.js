import { Router } from "express";
import OrderController from "../../controllers/orderController.js";

const router = Router();

const orderController = new OrderController();

/** READ */
router.get("/", orderController.fetchAllOrders);

router.get("/:id", orderController.getOrder);

router.post("/create", orderController.createOrder);

router.delete("/delete/:id", orderController.destroyOrder);

export default router;
