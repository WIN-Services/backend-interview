const express = require('express');
const orderController = require("../service/orderServiceController")

const router = express.Router();

router.post('/addOrder', orderController.addNewOrder);

router.get("/getOrder/:id", orderController.getAnOrderData);

router.get("/allOrder", orderController.getAllOrderList);

router.put('/updateOrder/:id', orderController.updateOrder);

router.delete('/deleteOrder/:id', orderController.deleteOrder);

module.exports = router

