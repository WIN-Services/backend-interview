const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/order-controller");
const orderController = new OrderController();

router.post("/", async (req, res) => await orderController.create(req, res));
router.put("/:id", async (req, res) => await orderController.update(req, res));
router.get("/:id", async (req, res) => await orderController.getSingle(req, res));
router.get("/", async (req, res) => await orderController.getAll(req, res));
router.delete("/:id", async (req, res) => await orderController.delete(req, res));

module.exports = router;