const orderDatabase = require("../databases/order");
const { ORDER_STATUS } = require("../models/order");

async function getOrdersPaginated(page, pageSize) {
    let response = await orderDatabase.getOrdersPaginated(page, pageSize);
    response.page = page;
    response.pageSize = pageSize;
    return response;
}

async function getOrderById(id) {
    return orderDatabase.getOrderById(id);
}

async function createOrder(body) {
    const recentOrderCreated = await isOrderCreatedInLastThreeHours();
    if (recentOrderCreated) return new Error("Order created within 3 hours, please try after some time");

    body.status = body.status || ORDER_STATUS.OPEN;
    return orderDatabase.createOrder(body);
}

async function updateOrder(id, body) {
    const recentOrderCreated = await isOrderCreatedInLastThreeHours();
    if (recentOrderCreated) return new Error("Order created within 3 hours, please try after some time");

    body.status = body.status || ORDER_STATUS.OPEN;
    return orderDatabase.updateOrder(id, body);
}

async function deleteOrder(id) {
    return orderDatabase.deleteOrder(id);
}

async function isOrderCreatedInLastThreeHours() {
    const orderCount = await orderDatabase.getOrderCountCreatedInLastThreeHours();
    console.log(orderCount);
    if (orderCount > 0) return true;
    return false;
}


module.exports = {
    getOrdersPaginated,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};