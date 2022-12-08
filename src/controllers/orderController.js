const orderModel = require('../models/orderModel');
const validator = require('../validator/validations')
const serviceModel = require('../models/serviceModel')

/*create order*/

const createOrder = async (req, res) => {
    try {
        let { totalfee, services } = req.body

        if (!validator.isValidRequestBody(req.body)) {
            return res.status(400).send({ status: false, message: "Please enter Valid order Details" })
        }
        if (!validator.isValid(totalfee)) {
            return res.status(400).send({ status: false, message: "total fee missing" })
        }
        if (!validator.isValid(services)) {
            return res.status(400).send({ status: false, message: "service field missing" });
        }
        if (!validator.isValidObjectId(services)) {
            return res.status(400).send({ status: false, message: "invalid service" });
        }

        let findService = await serviceModel.findById(services)
        if (!findService) {
            return res.status(404).send({ status: false, message: "no such service found" });
        }
        
        let checkExistOrder = await orderModel.find({ $and: [{ createdAt: { $gt: new Date(Date.now() - 3 * 60 * 60 * 1000) }, }, { services }] });
        
        if (checkExistOrder && checkExistOrder.length > 0) {
            return res.status(409).send({ status: false, message: "order already exist" });
        }

        let order = await orderModel.create({ totalfee: totalfee, services: [services] });

        res.status(201).send({ success: true, message: "Order Created Successfully", data: order });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

/*get All Orders*/

const getAllOrder = async (req, res) => {
    try {
        let orders = await orderModel.find();
        return res.status(200).send({ success: true, message: `Orders fetched Successfully`, data: orders, });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

/*Get Orders*/

const getOrders = async (req, res) => {
    try {
        let innerQuery = {};
        if (req.params.orderId) {
            if (!validator.isValidObjectId(req.params.orderId)) {
                return res.status(400).send({ status: false, message: "invalid orderId" });
            }
            let findOrder = await orderModel.findById(req.params.orderId)
            if (!findOrder) {
                return res.status(404).send({ status: false, message: "no such order found" });
            }
            innerQuery._id = req.params.orderId;
        }

        let order = await orderModel.find(innerQuery).populate('services', 'name');
        res.status(200).send({ success: true, message: `Orders fetched Successfully`, data: order });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

/*update Order*/

const updateOrder = async (req, res) => {
    try {
        let orderId = req.params.orderId
        let { totalfee, services } = req.body

        if (!validator.isValidObjectId(orderId)) {
            return res.status(400).send({ status: false, message: "invalid orderId" });
        }

        let findOrder = await orderModel.findById(orderId)
        if (!findOrder) {
            return res.status(404).send({ status: false, message: "no such order found" });
        }
        let existOrder = await orderModel.find({
            $and: [{createdAt: { $gt: new Date(Date.now() - 3 * 60 * 60 * 1000) }},{services}]});

        if (existOrder && existOrder.length > 0) {
            return res.status(409).send({ status: false, message: "order already exist" });
        }

        let payload = {};
        if (services) {
            if (!validator.validString(services)) {
                return res.status(400).send({ status: false, message: "service field missing" });
            }
            payload.services = [req.body.services];
        }
        if (totalfee) {
            if (!validator.validString(services)) {
                return res.status(400).send({ status: false, message: "service field missing" });
            }
            payload.totalfee = req.body.totalfee;
        }

        let order = await orderModel.findByIdAndUpdate(orderId, payload, {new: true});

        res.status(200).send({ success: true, message: "Order Updated Successfully", data: order });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


/*delete Order*/

const deleteOrder = async (req, res) => {
    try {

        let orderId = req.params.orderId
        if (!validator.isValidObjectId(orderId)) {
            return res.status(400).send({ status: false, message: "invalid orderId" });
        }
        let findOrder = await orderModel.findById(orderId)
        if (!findOrder) {
            return res.status(404).send({ status: false, message: "no such order found" });
        }
        let order = await orderModel.findByIdAndDelete(orderId);
        return res.status(200).send({ success: true, message: `Order Deleted` });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}




module.exports = { createOrder, getAllOrder, getOrders, updateOrder, deleteOrder }