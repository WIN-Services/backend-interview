const express = require('express'),
    router = express.Router();

const orderController = require("../controllers/order");




router.post("/order", orderController.create);
router.get("/order/:id", orderController.get);
router.get("/orders", orderController.getAll);
router.delete("/order/:id", orderController.delete);
router.patch("/order/:id", orderController.update);

module.exports = router;