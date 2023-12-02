const createOrder = require("./createOrder.controller")
const updateOrder = require("./updateOrder.controller")
const deleteOrder = require("./deleteOrder.controller")
const getAllOrders = require("./getAllOrders.controller")

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getAllOrders
}