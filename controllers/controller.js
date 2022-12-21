const orderModel = require('../models/order.model');
const serviceModel = require('../models/service.model');

const { v4: uuidv4 } = require('uuid');
const { addHours } = require('../utils/commonFunctions');


class Controller {
    async createOrder(req, res) {
        const { totalfee, services, address } = req.body;

        if (!totalfee || !services || !address) {
            return res.status(400).send({ message: "totalfee services address are required" })
        }

        try {
            let orderObj = new orderModel({
                datetime: new Date(),
                oid: uuidv4(),
                services,
                totalfee,
                address
            })
            await orderObj.save()
            return res.status(200).send({ message: "Order Placed Successfully", data: orderObj })
        }
        catch (e) {
            console.log({ e })
            return res.status(500).send({ message: "something went wrong" })
        }
    }

    async createService(req, res) {
        const { serviceName, serviceDescription } = req.body;

        if (!serviceName || !serviceDescription) {
            return res.status(400).send({ message: "serviceName serviceDescription are required" })
        }

        try {
            let serviceObj = new serviceModel({
                serviceId: uuidv4(),
                serviceName,
                serviceDescription
            })
            await serviceObj.save()
            return res.status(200).send({ message: "service created", data: serviceObj })
        }
        catch (e) {
            console.log({ e })
            return res.status(500).send({ message: "something went wrong" })
        }
    }

    async updateOrder(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: "id required" });
        }
        try {
            const isOrderExist = await orderModel.findById(id);
            if (!isOrderExist) {
                return res.status(404).send({ message: "Order not found" })
            }
            let checkTime = addHours(3, isOrderExist.updatedAt);
            let currentTime = new Date();

            console.log(checkTime);
            console.log(currentTime);


            if (checkTime < currentTime) {
                return res.status(400).send({ message: "order update are not allowed till 3hr" })
            }

            let orderObj = await orderModel.findByIdAndUpdate(id, { ...req.body, datetime: new Date() }, { new: true });
            return res.status(200).send({ message: "Order Successfully updated", data: orderObj });
        }
        catch (e) {
            console.log(e);
            return res.status(500).send({ message: "something went wrong" })
        }
    }

    async getOrderById(req, res) {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: "id required" })
        }
        try {
            let orderObj = await orderModel.findOne({ _id: id, isCancel: false }).populate("services");
            if (orderObj) {
                return res.status(200).send({ message: "Order data", data: orderObj })
            } else {
                return res.status(404).send({ message: "Order does not exist" })
            }
        }
        catch (e) {
            return res.status(500).send({ message: "something went wrong" })
        }
    }

    async getAllOrder(req, res) {
        try {
            let orderObj = await orderModel.find({ isCancel: false }).populate("services");
            return res.status(200).send({ message: "All orders", data: orderObj })
        }
        catch (e) {
            return res.status(500).send({ message: "something went wrong" })
        }
    }

    async getAllServices(req, res) {
        try {
            let services = await serviceModel.find();
            return res.status(200).send({ message: "services lists", data: services })
        }
        catch (e) {
            return res.status(500).send({ message: "something went wrong" })
        }
    }

    async cancelOrder(req, res) {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: "id required" });
        }
        try {
            let orderObj = await orderModel.findByIdAndUpdate(id, { isCancel: true }, { new: true });
            if (orderObj) {
                return res.status(200).send({ message: "Order cancel successfully", data: orderObj })
            } else {
                return res.status(404).send({ message: "Order does not exist" })
            }
        }
        catch (e) {
            return res.status(500).send({ message: "something went wrong" })
        }
    }
}


module.exports = new Controller();