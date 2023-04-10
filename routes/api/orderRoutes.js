import { Router } from "express";
import OrderController from "../../controllers/orderController.js";

const router = Router();

const orderController = new OrderController();

/** READ */
router.get("/", orderController.fetchAllOrders);

router.get("/:id", orderController.getOrder);

/**CREATE */
router.post("/create", orderController.createOrder);

/**DELETE */
router.delete("/delete/:id", orderController.destroyOrder);

/**PUT */
router.put(
  "/add-service/orderId/:orderId/serviceId/:serviceId",
  orderController.addServiceToOrder
);

export default router;
