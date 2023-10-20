const orderService = require("../services/order");
const { validation } = require("../validations");

async function getAllOrders(req, res) {
    const clientIp = req.ip;
    try {
        const defaultPageLimit = 10;
        let pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : defaultPageLimit;
        pageSize = pageSize > 0 ? pageSize : defaultPageLimit;
        const page = req.query.page || 0;

        const result = await orderService.getOrdersPaginated(page, pageSize);

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

async function getOrderById(req, res) {
    const clientIp = req.ip;
    try {
        const { id } = req.params;
        const result = await orderService.getOrderById(id);

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


async function createOrder(req, res) {
    const clientIp = req.ip;
    try {
        const data = req.body;
        const validationResult = await validation('Order', data);
        if (validationResult instanceof Error) return res.status(400).send(validationResult.message);

        const result = await orderService.createOrder(data);
        if (result instanceof Error) return res.status(422).send(result.message);
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

async function updateOrder(req, res) {
    const clientIp = req.ip;
    try {
        const { id } = req.params;
        const data = req.body;
        const validationResult = await validation('Order', data);
        if (validationResult instanceof Error) return res.status(400).send(validationResult.message);

        const result = await orderService.updateOrder(id, data);
        if (result instanceof Error) return res.status(422).send(result.message);

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

async function deleteOrder(req, res) {
    const clientIp = req.ip;
    try {
        const { id } = req.params;
        const result = await orderService.deleteOrder(id);

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
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};