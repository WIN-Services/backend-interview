const express = require("express")
const controller = require("../controller/orders")
const router = express.Router()

router.post('/order',controller.createOrder)
router.put('/order',controller.updateOrder)
router.get('/order',controller.getAllOrders)
router.delete('/order',controller.deleteOrder)
module.exports = router