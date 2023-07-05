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
        throw new EError('No such order id found to be updated', 500);
    }

    let response = {};
    response = await orderRepository.updateOrder(id, fees)

    return response;
};

module.exports.createOrder = async (body) => {


    let response = {};
    response = await orderRepository.createOrder(body)

    return response;
};