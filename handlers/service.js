const ServiceModel = require("../models/service");
const OrderModel = require("../models/order");


async function checkIfInUse(id) {
    let service = await ServiceModel.findOne({ id: Number(id) });

    query = { services: { $in: service._id } }
    let count = await OrderModel.countDocuments(query).exec();

    return count > 0;
}

async function validateData(id) {
    if (id == null) {
        return false;
    }

    let count = await ServiceModel.find({ id: Number(id) }).exec();

    return count.length == 0;
}

module.exports = {
    count: async function (query = {}) {
        try {
            return await ServiceModel.countDocuments(query).exec();
        } catch (error) {
            throw (error);
        }
    },
    find: async function (query = {}) {
        try {
            return await ServiceModel.find(query).exec();
        } catch (error) {
            console.log(error.message);
            throw (error);
        }
    },
    findOne: async function (query = {}) {
        try {
            return await ServiceModel.findOne(query).exec();
        } catch (error) {
            console.log(error.message);
            throw (error);
        }
    },
    findById: async function (serviceId) {
        try {
            return await ServiceModel.findById(serviceId).exec();
        } catch (error) {
            console.log(error.message);
            throw (error);
        }
    },
    create: async function (data) {
        if (await validateData(data.id) === false) {
            throw Error("Invalid id or Id already Exists.");
        }
        try {
            return await ServiceModel.create(data);
        } catch (error) {
            throw (error);
        }
    },
    findByIdAndUpdate: async function (listingId, newData) {
        try {
            let service = await this.findOne({ id: Number(listingId) });

            if(service == null) {
                throw Error("Service Id does not exist");
            }

            return await ServiceModel.findByIdAndUpdate(service._id, { $set: newData });
        } catch (error) {
            throw (error);
        }
    },
    delete: async function (query = {}) {
        if (await checkIfInUse(query.id)) {
            throw Error("Service Id in use. Please delete orders with this Id.")
        }
        try {
            return await ServiceModel.deleteOne(query);
        } catch (error) {
            throw (error);
        }
    },
}