let Order = require("../models/order");
let serviceRecords = require("./serviceRecords")

async function createOrder(req, res) {
    try {
        if (!(await Order.findOne({ id: req.body.id }))) {
            let order = new Order();
            order.id = req.body.id;
            order.totalfee = req.body.totalfee;
            order.services = await serviceRecords.getServiceRecordsByNames(req.body.services);
            res.json(await order.save());
        }
        else {
            throw "OrderId already exists"
        }
    }
    catch (err) {
        console.error("error in createOrder function: ", err);
        res.status(400).send(err);
    }
}

async function updateOrder(req, res) {
    try {
        let order = await Order.findOne({ id: req.params.id })
        if (order) {
            if (req.body.totalfee) {
                order.totalfee = req.body.totalfee;
            }
            if (req.body.services) {
                order.services = await serviceRecords.getServiceRecordsByNames(req.body.services);
            }
            await Order.findOneAndUpdate({ id: req.params.id }, order)
            res.json(await Order.find({ id: req.params.id }));
        }
        else {
            throw "OrderId not found"
        }
    }
    catch (err) {
        console.error("error in updateOrder function: ", err);
        res.status(400).send(err);
    }
}

async function deleteOrder(req, res) {
    try {
        let order = await Order.findOne({ id: req.params.id })
        if (order) {
            await Order.findOneAndDelete({ id: req.params.id })
            res.json({ status: "success", msg: "Deleted successfully" });
        }
        else {
            throw "OrderId not found"
        }
    }
    catch (err) {
        console.error("error in deleteOrder function: ", err);
        res.status(400).send(err);
    }
}

async function getAllOrders(req, res) {
    try {
        res.json(await Order.find())
    }
    catch (err) {
        console.error("error in getAllOrders function: ", err);
        res.status(400).send(err);
    }
}

async function getOrderById(req, res) {
    try {
        let order = await Order.findOne({ id: req.params.id })
        if (order) {
            res.json(order);
        }
        else {
            throw "OrderId not found"
        }
    }
    catch (err) {
        console.error("error in getOrderById function: ", err);
        res.status(400).send(err);
    }
}

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getAllOrders,
    getOrderById
}