import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  updateOrder,
} from "../services/orderService";
import { paginate } from "../middleware/paginate";
import { sort } from "../middleware/sort";
import { validate } from "../middleware/validate";
import {
  createOrderSchema,
  deleteOrderSchema,
  getOrderSchema,
  updateOrderSchema,
} from "../validations";

const router = Router();

router.get("/", paginate, sort, async function (req, res) {
  res.json(await getAllOrders(req.pagination, req.sort));
});

router.get("/:order_id", validate(getOrderSchema), async function (req, res) {
  res.json(await getOrder(req.formatted_req));
});

router.post("/", validate(createOrderSchema), async function (req, res) {
  res.status(201).json(await createOrder(req.formatted_req));
});

router.put(
  "/:order_id",
  validate(updateOrderSchema),
  async function (req, res) {
    res.json(await updateOrder(req.formatted_req));
  }
);

router.delete(
  "/:order_id",
  validate(deleteOrderSchema),
  async function (req, res) {
    res.status(204).json(await deleteOrder(req.formatted_req));
  }
);

export default router;
