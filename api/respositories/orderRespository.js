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
    return orderResult + serviceResult;
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

module.exports.updateOrder = async (id, fees) => {
    let orderResult = await orderModel.update(id, fees, {
        where: {
            id: id,
            totalFees: fees
        }
    })
    return orderResult
}

module.exports.deleteOrders = async (id) => {
    let orderResult = await orderModel.destroy({
        where: { id: id }
    })
    return orderResult
}