const OrderModel = require("../models/order");
const ServiceModel = require("../models/service");


async function validateData(data) {
    if (data.id == null || data.totalFee == null) {
        return false;
    }

    return true;
}

async function getServiceIds(services) {
    let serviceIds = [];

    services.forEach(service => {
        serviceIds.push(Number(service.id));
    });

    try {
        let query = { id: { $in: serviceIds } };
        let serviceObjs = await ServiceModel.find(query).exec();
        if (serviceObjs.length != serviceIds.length) {
            throw Error("Invalid service. Please check your input");
        }
        return serviceObjs.map(obj => obj._id);
    } catch (error) {
        throw (error);
    }
}

function createOrderReturnObject(order, serviceIds) {
    return {
        _id: order._id,
        id: order.id,
        datetime: order.datetime,
        totalfee: order.totalfee,
        services: serviceIds
    };
}

function checkTimeout(newTime, oldTime) {
    newTime = newTime == null ? Date.now() : newTime;

    let hours = Math.abs(newTime - oldTime) / 3600000;

    if (hours < 3) {
        throw (Error("Cannot update before 3hrs. Please try again later"));
    }
}

module.exports = {
    count: async function (query = {}) {
        try {
            return await OrderModel.countDocuments(query).exec();
        } catch (error) {
            throw (error);
        }
    },
    find: async function () {
        try {
            let orders = await OrderModel.find(query={});

            let result = await Promise.all(orders.map(async order => {
                let serviceIds = [];
                if (order.services.length > 0) {
                    let query = { _id: { $in: order.services } };
                    let services = await ServiceModel.find(query).exec();
                    serviceIds = services.map(service => { return { id: service.id } });
                }
                return createOrderReturnObject(order, serviceIds);
            }));
            return result;
        } catch (error) {
            console.log(error.message);
            throw (error);
        }
    },
    findOne: async function (query = {}) {
        try {
            let order = await OrderModel.findOne(query).exec();
            let serviceIds = [];
            if (order.services.length > 0) {
                let query = { _id: { $in: order.services } };
                let services = await ServiceModel.find(query).exec();
                serviceIds = services.map(service => { return { id: service.id } });
            }
            return createOrderReturnObject(order, serviceIds);
        } catch (error) {
            console.log(error.message);
            throw (error);
        }
    },
    findById: async function (orderId) {
        try {
            return await OrderModel.findById(orderId).exec();
        } catch (error) {
            console.log(error.message);
            throw (error);
        }
    },
    create: async function (data) {
        if (validateData(data) === false) {
            throw Error("Invalid data!! Please check your input");
        }
        try {
            console.log(data);
            data.services = await getServiceIds(data.services);
            
            return await OrderModel.create(data);
        } catch (error) {
            throw (error);
        }
    },
    findByIdAndUpdate: async function (listingId, newData) {
        if (validateData(newData) === false) {
            throw Error("Invalid data!! Please check your input");
        }
        try {
            let order = await OrderModel.findOne({ id: Number(listingId) }).exec();

            if (order == null) {
                throw Error("Order does not exist");
            }

            if (newData.services.length > 0) {
                newData.services = await getServiceIds(newData.services);
            }

            checkTimeout(newData.datetime, order.datetime);

            return await OrderModel.findByIdAndUpdate(order._id, { $set: newData });
        } catch (error) {
            throw (error);
        }
    },
    delete: async function (query = {}) {
        try {
            return OrderModel.deleteOne(query);
        } catch (error) {
            throw (error);
        }
    },
}