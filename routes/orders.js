const express = require("express");
const router = express.Router();
const Orders = require('./../resources/orders');

router.get("/", async (req, res, next) => {
    try {
        let finalResponse = await Orders.getAllOrders()
        res.json({
            status : 'success',
            result : finalResponse
        });
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        let finalResponse = await Orders.addOrder(req.body)
        res.json({
            status : 'success',
            result : finalResponse
        });
    } catch (err) {
        next(err);
    }
});

router.put("/:orderId", async (req, res, next) => {
    try {
        await Orders.updateOrder(req.params.orderId,req.body)
        res.json({
            status : 'success'
        });
    } catch (err) {
        next(err);
    }
});

router.delete("/:orderId", async (req, res, next) => {
    try {
        await Orders.deleteOrder(req.params.orderId)
        res.json({
            status : 'success',
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
