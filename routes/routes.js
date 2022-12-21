'use strict'

const express = require('express')
const router = express.Router();
const Controller = require('..//controllers/controller');

router.get("/", function (req, res) {
  res.status(200).send({ status: 'working' });
})


router.get("/order/single/:id", Controller.getOrderById);
router.post("/order", Controller.createOrder)

router.put("/order/:id", Controller.updateOrder)

router.get("/order/getAllOrders", Controller.getAllOrder);

router.patch("/order/cancelOrder/:id", Controller.cancelOrder);

router.post("/createservice", Controller.createService)

router.get("/getAllservices", Controller.getAllServices);


module.exports = router