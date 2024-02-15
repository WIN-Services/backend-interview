const messages = require("../helpers/messages");
const orderService = require("../service/order");

async function createOrder(req, res) {
    req.body = {...req.body, datetime: new Date()};
    let checkOrderTimeGap = await orderService.checkOrderTimeGap(req.body);
    if (checkOrderTimeGap) {
        let createdOrder = await orderService.createOrder(req.body);
        res.send({...createdOrder,message:messages.orderCreated});
        return;
    } else {
        res.status(409).send({message:messages.orderAlreadyExists});
    }
}

async function deleteOrder(req, res) {
    let response = await orderService.deleteOrder(req.body);
    res.send({...response,message:messages.orderDeleted});
}

async function updateOrder(req, res) {
    let prevOrder = await orderService.fetchOneOrder(req.body.id);
    if (prevOrder==null) {
        res.status(409).send({message: messages.orderDosentExist});
        return;
    }
    let datetime = new Date();
    let checkUpdateTimeGap = await orderService.timeDiffForOrderModif(datetime, prevOrder.datetime);
    if (checkUpdateTimeGap) {
        let response = await orderService.updateOrder(req.body);
        console.log(response);
        res.send({message:(messages.orderModified)});
        return;
    } else {
        res.status(409).send({message: messages.orderCannotBeModified});
    }
}

async function fetchAllOrders(req, res) {
    let allOrders = await orderService.fetchAllOrders();
    res.status(200).send(allOrders);
}

async function fetchOneOrder(req, res) {
    let order = await orderService.fetchOneOrder(parseInt(req.query.orderId));
    if (order==null) {
        res.status(404).send({message: messages.orderNotFound});
    } else {
        res.status(200).send(order);
    }
}


module.exports = {
    createOrder,
    deleteOrder,
    updateOrder,
    fetchAllOrders,
    fetchOneOrder
};