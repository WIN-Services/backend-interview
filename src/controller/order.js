const orders = require("../model/order");
const servicesModel = require("../model/service");

exports.get_all_orders = function (req, res) {
    return new Promise(async (resolve, reject) => {
        try {
            if (req.role == "Admin") {
                const allOrders = await orders.find({}).exec();
                res.setHeader("Content-Type", "application/json");
                res.status(200).send(allOrders);
                resolve(allOrders);
            } else {
                const userOrders = await orders
                    .find({ user: req.body.user })
                    .exec();
                res.setHeader("Content-Type", "application/json");
                res.status(200).send(userOrders);
                resolve(userOrders);
            }
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
            reject(err);
        }
    });
};

exports.get_order_by_id = function (req, res) {
    return new Promise(async (resolve, reject) => {
        if (!req.params.id) {
            res.sendStatus(400);
            reject("Bad Request");
        } else {
            try {
                const order = await orders
                    .findOne({ _id: req.params.id })
                    .exec();
                if (!order) {
                    res.status(404).send("Order not found!");
                    reject("Order not found!");
                } else {
                    res.setHeader("Content-Type", "application/json");
                    res.status(200).send(order);
                    resolve(order);
                }
            } catch (err) {
                console.log(err);
                res.sendStatus(500);
                reject(err);
            }
        }
    });
};

exports.add_order = function (req, res) {
    return new Promise(async (resolve, reject) => {
        const { services } = req.body;
        if (!services) {
            res.sendStatus(400);
            reject("Bad Request");
        } else {
            try {
                let orderDetails = {
                    user: req.user,
                    services: [],
                    totalFee: 0,
                };
                for (let service of services) {
                    const serviceData = await servicesModel
                        .findOne({ $or: [{ name: service }, { id: service }] })
                        .exec();
                    if (!serviceData) {
                        res.status(400).send(
                            `Invalid Service ('${service}') provided!`
                        );
                        reject("Invalid Service provided!");
                        return;
                    } else {
                        orderDetails.services.push(serviceData.name);
                        orderDetails.totalFee += serviceData.fee;
                    }
                }
                const order = new orders(orderDetails);
                await order.save();
                const addedOrder = await orders
                    .findOne({ id: order.insertedId })
                    .exec();
                res.setHeader("Content-Type", "application/json");
                res.status(201).send(addedOrder);
                resolve(addedOrder);
            } catch (err) {
                console.log(err);
                res.sendStatus(500);
                reject(err);
            }
        }
    });
};

exports.update_order = function (req, res) {
    return new Promise(async (resolve, reject) => {
        if (!req.params.id || !req.body.services) {
            res.sendStatus(400);
            reject("Bad Request");
        } else {
            try {
                const order = await orders
                    .findOne({ _id: req.params.id })
                    .exec();
                if (!order) {
                    res.status(400).send("Invalid OrderId provided!");
                    reject("Invalid OrderId provided!");
                } else if (
                    order.updatedAt.getTime() >
                    new Date().getTime() - 3600 * 3
                ) {
                    res.status(403).send(
                        "You are not allowed to update the order within 3 hours of creation/updation."
                    );
                    reject(
                        "You are not allowed to update the order within 3 hours of creation/updation."
                    );
                } else {
                    let orderDetails = {
                        user: req.user,
                        services: [],
                        totalFee: 0,
                    };
                    for (let service of req.body.services) {
                        const serviceData = await servicesModel
                            .findOne({
                                $or: [{ name: service }, { id: service }],
                            })
                            .exec();
                        if (!serviceData) {
                            res.status(400).send(
                                `Invalid Service ('${service}') provided!`
                            );
                            reject("Invalid Service provided!");
                            return;
                        } else {
                            orderDetails.services.push(serviceData.name);
                            orderDetails.totalFee += serviceData.fee;
                        }
                    }
                    await orders.updateOne(
                        { id: req.params.id, user: req.body.user },
                        { $set: orderDetails }
                    );
                    res.status(200).send("order updated successfully!");
                    resolve("order updated successfully!");
                }
            } catch (err) {
                console.log(err);
                res.sendStatus(500);
                reject(err);
            }
        }
    });
};

exports.delete_order = function (req, res) {
    return new Promise(async (resolve, reject) => {
        if (!req.params.id) {
            res.sendStatus(400);
            reject("Bad Request");
        } else {
            try {
                const order = await orders
                    .findOne({ _id: req.params.id })
                    .exec();
                if (!order) {
                    res.status(404).send("Order not found!");
                    reject("Order not found!");
                } else if (order.user != req.user) {
                    res.sendStatus(403);
                    reject("Forbidden");
                } else {
                    await orders.findOneAndDelete({
                        _id: req.params.id,
                    });
                    res.status(200).send("Order deleted successfully!");
                    resolve("Order deleted successfully!");
                }
            } catch (err) {
                console.log(err);
                res.sendStatus(500);
                reject(err);
            }
        }
    });
};
