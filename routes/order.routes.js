const express = require("express");
const { createOrder, deleteOrder, updateOrder, fetchAllOrders, fetchOneOrder } = require("../controller/orderController");
const {validateCreateOrder, validateDeleteOrder, validateUpdateOrder, validateOrderIdParam} = require("../middlewares/validateOrders");


const router = express.Router();

router.post("/createOrder", validateCreateOrder, async function (req, res) {
    await createOrder(req, res);
});

router.post("/deleteOrder", validateDeleteOrder, async function (req, res) {
    await deleteOrder(req, res);
});

router.post("/updateOrder",validateUpdateOrder, async function (req, res) {
    await updateOrder(req, res);
});

router.get("/fetchAllOrders", async function (req, res) {
    await fetchAllOrders(req, res);
});

router.get("/fetchOneOrder", validateOrderIdParam, async function (req, res) {
    await fetchOneOrder(req, res);
});


module.exports = router;