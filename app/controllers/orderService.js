const orderServiceService = require("../services/orderService");
const { validation } = require("../validations");

async function getAllServices(req, res) {
    const clientIp = req.ip;
    try {
        const defaultPageLimit = 10;
        let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : defaultPageLimit;
        pageSize = pageSize > 0 ? pageSize : defaultPageLimit;
        const page = req.query.page || 0;

        const result = await orderServiceService.getServicesPaginated(page, pageSize);

        return res.status(200).send(result);
    } catch (err) {
        // logging error: We may use logging services later on
        console.log({
            error: err,
            clientIp: clientIp,
            reqUrl: req.url
        });
        return res.sendStatus(500);
    }
}

async function getServiceById(req, res) {
    const clientIp = req.ip;
    try {
        const { id } = req.params;
        const result = await orderServiceService.getServiceById(id);

        return res.status(200).send(result);
    } catch (err) {
        // logging error: We may use logging services later on
        console.log({
            error: err,
            clientIp: clientIp,
            reqUrl: req.url
        });
        return res.sendStatus(500);
    }
}


async function createService(req, res) {
    const clientIp = req.ip;
    try {
        const data = req.body;
        const validationResult = await validation('Service', data);
        if (validationResult instanceof Error) return res.status(400).send(validationResult.message);

        const result = await orderServiceService.createService(data);

        return res.status(200).send(result);
    } catch (err) {
        // logging error: We may use logging services later on
        console.log({
            error: err,
            clientIp: clientIp,
            reqUrl: req.url
        });
        return res.sendStatus(500);
    }
}

async function updateService(req, res) {
    const clientIp = req.ip;
    try {
        const { id } = req.params;
        const data = req.body;
        const validationResult = await validation('Service', data);
        if (validationResult instanceof Error) return res.status(400).send(validationResult.message);

        await orderServiceService.updateService(id, data);

        return res.sendStatus(200);
    } catch (err) {
        // logging error: We may use logging services later on
        console.log({
            error: err,
            clientIp: clientIp,
            reqUrl: req.url
        });
        return res.sendStatus(500);
    }
}

async function deleteService(req, res) {
    const clientIp = req.ip;
    try {
        const { id } = req.params;
        const result = await orderServiceService.deleteService(id);

        return res.sendStatus(200);
    } catch (err) {
        // logging error: We may use logging services later on
        console.log({
            error: err,
            clientIp: clientIp,
            reqUrl: req.url
        });
        return res.sendStatus(500);
    }
}

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};