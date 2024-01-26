const express = require("express");
const router = express.Router();

const {
  getAll,
  create,
  update,
  deleteById,
} = require("../controllers/orders.controller");

const { validateOrder, validateReq } = require("../middlewares/order");

router.get("/", getAll);

router.post("/", validateOrder, create);

router.patch("/:id", validateReq, update);

router.delete("/:id", validateReq, deleteById);

module.exports = router;
