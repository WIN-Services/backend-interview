const serviceDatabase = require("../databases/orderService");

async function getServicesPaginated(page, pageSize) {
    let response = await serviceDatabase.getServicesPaginated(page, pageSize);
    response.page = page;
    response.pageSize = pageSize;
    return response;
}

async function getServiceById(id) {
    return serviceDatabase.getServiceById(id);
}

async function createService(body) {
    return serviceDatabase.createService(body);
}

async function updateService(id, body) {
    return serviceDatabase.updateService(id, body);
}

async function deleteService(id) {
    return serviceDatabase.deleteService(id);
}


module.exports = {
    getServicesPaginated,
    getServiceById,
    createService,
    updateService,
    deleteService
};