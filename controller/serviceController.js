const messages = require("../helpers/messages");
const service = require("../service/service");


async function createService(req, res) {
    let data = await service(req.body);
    res.status(200).send({...data, message:messages.serviceAdded});
}

module.exports = {
    createService
};