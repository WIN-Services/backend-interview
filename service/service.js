const serviceRepository = require("../repository/service");

async function service(body) {
    return await serviceRepository.insertRepo(body);
}

module.exports = service;