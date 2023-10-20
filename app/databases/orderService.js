const db = require("../../database/models");
const Service = db.Service;

async function getServicesPaginated(page, pageSize) {
    return Service.findAndCountAll({
        attributes: ["id", "description", "name", "orderId"],
        offset: page * pageSize,
        limit: pageSize
    });
}

async function getServiceById(id) {
    return Service.findByPk(id, {
        attributes: ["id", "description", "name", "orderId"],
    });
}

async function createService(body) {
    return Service.create(body);
}

async function updateService(id, body) {
    return Service.update(body, {
        where: { id: id }
    });
}

async function deleteService(id) {
    return Service.destroy({
        where: { id: id }
    });
}



module.exports = {
    getServicesPaginated,
    getServiceById,
    createService,
    updateService,
    deleteService
};