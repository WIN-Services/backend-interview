const { Op } = require("sequelize");
const db = require("../../database/models");
const Order = db.Order;

async function getOrdersPaginated(page, pageSize) {
    return Order.findAndCountAll({
        attributes: ["id", "description", "status", "totalFee"],
        // includes: [],
        offset: page * pageSize,
        limit: pageSize
    });
}

async function getOrderById(id) {
    return Order.findByPk(id, {
        attributes: ["id", "description", "status", "totalFee"],
        include: [{
            model: db.Service,
            attributes: ["id", "description", "name"]
        }]
    });
}

async function createOrder(body) {
    return Order.create(body);
}

async function updateOrder(id, body) {
    return Order.update(body, {
        where: { id: id }
    });
}

async function deleteOrder(id) {
    return Order.destroy({
        where: { id: id }
    });
}

async function getOrderCountCreatedInLastThreeHours() {
    return Order.count({
        where: {
            createdAt: {
                [Op.gt]: new Date(Date.now() - (3 * 60 * 60 * 1000)),
            }
        }
    });
}


module.exports = {
    getOrdersPaginated,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderCountCreatedInLastThreeHours
};