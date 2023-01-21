const {
    createOrderController,
    getOrderControlller,
    updateOrderControlller,
    deleteOrderControlller,
} = require('./controllers/controllers')

const router = require("express").Router();



router.post("/createOrder", createOrderController);
router.get("/getOrder/:id", getOrderControlller);
router.get("/getOrder", getOrderControlller);
router.put("/updateOrder/:id", updateOrderControlller);
router.delete("/:id", deleteOrderControlller);

module.exports = router;