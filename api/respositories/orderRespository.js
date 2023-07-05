'use strict'

let orderModel = require('../models/orderModel')
let serviceModel = require('../models/serviceRecords')

module.exports.getAllOrders = async () => {
    let orderResult = await orderModel.findAll({
        where: {}
    })
    let serviceResult = await serviceModel.findAll({
        where: {}
    })
    return [...orderResult, ...serviceResult]
}

module.exports.getOrdersById = async (orderId) => {
    let orderResult = await orderModel.findone({
        where: {
            id: orderId
        }
    })
    return orderResult
}

module.exports.createOrder = async (body) => {

    let orderResult = await orderModel.create(body)
    return orderResult
}

module.exports.updateOrder = async (id, orderFees) => {
    let updateResult = await orderModel.update(orderFees, {
        where: {
            id
        }
    })
    return updateResult
}

module.exports.deleteOrders = async (id) => {
    let orderResult = await orderModel.destroy({
        where: { id }
    })
    return orderResult
}