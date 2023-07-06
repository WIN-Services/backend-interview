'use strict'

const sequelize = require('../helpers/db')
const orderRepository = require('../respositories/orderRespository')

module.exports.getAllOrders = async () => {
    let orders = await orderRepository.getAllOrders()
    return orders;
}

module.exports.getOrdersById = async (id) => {
    let ordersById = await orderRepository.getOrdersById(id)
    return ordersById;
}

module.exports.updateOrder = async (id, fees) => {

    let order = await orderRepository.getOrdersById(id);
    if (!order) {
        return { message: 'No such order id found to be updated', statusCode: 500 };
    }
    return await orderRepository.updateOrder(id, fees)
};

module.exports.createOrder = async (body) => {

    return await orderRepository.createOrder(body)
};