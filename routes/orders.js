const express = require('express')

const {
    getOrders,
    getOrder,
    createOrder,
    deleteOrder,
    updateOrder
} = require('../controllers/orderController')

const router = express.Router()

//GET all orders
router.get('/', getOrders)

//GET a single order
router.get('/:id',getOrder)

//POST a new order
router.post('/', createOrder)

//DELETE an order
router.delete('/:id', deleteOrder)

//UPDATE a workout
router.put('/:id', updateOrder)

module.exports = router
