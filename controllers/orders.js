const mongoose = require("mongoose");
const Order = require('../models/orders');

 const getOrders = async (req, res) => {
    try {
        console.log(new Date())
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


 const createOrder = async (req, res) => {
    try {
        const existingOrder = await Order.findOne({ _id: req.body.id });
        if (existingOrder)
            return res.status(400).json({ error: 'Order already exists!' });

        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

 const updateOrderById = async (req, res) => {
    try {
        const existingOrder = await Order.findOne({ _id: req.params.id });

        if (existingOrder) {
            const timeDifferenceInHours = Math.abs((existingOrder.datetime - new Date(req.body.datetime)) / (1000 * 60 * 60));
            if(new Date(req.body.datetime) < existingOrder.datetime) {
                return res.status(400).json({error:'Not Allowed as you enter past time'});
            }
            if (timeDifferenceInHours < 3) {
                return res.status(400).json({ error: 'Cannot update an order within 3 hours of its creation.' });
            }
        }
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
 const deleteOrderById = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



 const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports = {
    getOrders, getOrderById, createOrder, updateOrderById, deleteOrderById
  };