
require("dotenv").config();

const { errorHandler } = require("../helper/status");
const {
    getOrder,addOrder,deleteOrder,updateOrder,getOrderById
} = require("../services/order.services");


exports.getOrderById = async (req, res) => {
    try {
        const resp = await getOrderById(req.query.id);
        return res.status(resp.status || 200).json(resp);

    } catch (err) {
        return res.status(500).json({ status: 500, message: errorHandler.somethingWentWrong, err });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const resp = await getOrder();
        return res.status(resp.status || 200).json(resp);

    } catch (err) {
        return res.status(500).json({ status: 500, message: errorHandler.somethingWentWrong, err });
    }
};

exports.addOrder = async (req, res) => {
    try {
        const resp = await addOrder(req.body);
        return res.status(resp.status || 201).json(resp);

    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: 500, message: errorHandler.somethingWentWrong, err });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const {id} = req.query;
        const resp = await deleteOrder(id);
        return res.status(resp.status || 200).json(resp);

    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: 500, message: errorHandler.somethingWentWrong, err });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const {id} = req.query;
        const resp = await updateOrder(id,req.body);
        return res.status(resp.status || 200).json(resp);

    } catch (err) {
        console.log(err)
        return res.status(500).json({ status: 500, message: errorHandler.somethingWentWrong, err });
    }
};
