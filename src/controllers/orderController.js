const OrderModel = require('../models/orderModel');
const ServiceModel = require('../models/serviceModel');

exports.canUserCreateOrder = async (req, res, next) => {
    try {
        const threeHrsAgo = new Date();
        threeHrsAgo.setHours(threeHrsAgo.getHours() - 3);

        const orders = await OrderModel.find({
            createdAt: { $gte: threeHrsAgo }
        });

        if (orders) {
            return res.status(403).json({ message: 'Last Order was created in Less than 3 Hours' });
        }

        next();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.createOrder = async (req, res) => {
    try {
        const { services, totalFee } = req.body;
        const order = await OrderModel.create({
            services,
            totalFee,
        });

        res.status(200).json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await OrderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Invalid order!' });
        }

        order.services = req.body.services;
        order.totalFee = req.body.totalFee;
        const updatedOrder = await order.save();

        return res.status(200).json(updatedOrder);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await OrderModel.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Invalid order!' });
        }

        await OrderModel.findByIdAndDelete(orderId);

        return res.status(200).json({ message: 'Order deleted successfully!' });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

exports.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await OrderModel.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Invalid order!' });
        }

        return res.status(200).json(order);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        const page = req.params.page;
        const limit = req.params.limit;
        const offset = (page - 1) * limit;

        const orders = await OrderModel.find({}).populate('services').skip(offset).limit(limit);

        return res.status(200).json(orders);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}
