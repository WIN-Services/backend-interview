'use strict'

const app = require('express')
const router = app.Router()
const orderController = require('../controllers/orderController')

const asyncHandler = fn => (req, res, next) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch(next)
}

router.get('/orders', asyncHandler(orderController.getAllOrders))

router.get('/orders/:id', asyncHandler(orderController.getOrdersById))

router.post('/orders', asyncHandler(orderController.createOrders))

router.put('/orders/:id', asyncHandler(orderController.updateOrders))

router.delete('/orders/:id', asyncHandler(orderController.deleteOrders))


module.exports = router;