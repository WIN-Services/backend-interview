const express = require("express");
const router = express.Router();
const {
    getOrder,addOrder,deleteOrder,updateOrder,getOrderById
} = require("../controller/order.controller");


router.get("/get", getOrderById);
router.get("/get-all", getOrder);
router.post("/add", addOrder);
router.put("/update", updateOrder);
router.delete("/remove", deleteOrder);


module.exports = router;
