


const mongoose = require('mongoose');
const Order = require('../models/Order');
const Service = require('../models/Service');

const OrderController = {
    listOrder: async (req, res) => {
        try {
            const orders = await Order.find().populate('services'); // Use .populate() to populate the 'services' field

            return res.status(200).json({ success: true, data: orders });

        } catch (error) {
            res.status(500).json({ success: false, data: 'An error occurred while fetching orders.' });
        }

    },
    createOrder: async (req, res) => {
        try {
            const obj = {
                id: '123',
                name: 'Inspection',
            }
            const result = await Service.create(obj);
            if (result) {
                const orderObj = {
                    id: '226',
                    datetime: new Date('2022-11-02T12:12:12.222Z'),
                    totalfee: 150,
                    services: [result._id]
                }
                const orderResult = await Order.create(orderObj);
                if (!orderResult) {
                    return res.status(400).json({ success: false, data: "Something went wrong in order creation" })
                }
                return res.status(200).json({ success: true, data: "Ordre created" })
            }
            return res.status(400).json({ success: false, data: "Something went wrong in service creation" })

        } catch (error) {
            return res.status(500).json({ success: false, data: "Internal server error" })
        }

    },
    findOrderById: async (req, res) => {
        const orderId = req.params.orderId;

        try {
            const order = await Order.findById(orderId).populate('services'); // Use .populate() to populate the 'services' field

            if (!order) {
                return res.status(404).json({ success: false, data: 'Order not found' });
            }

            return res.status(200).json({ success: true, data: order });
        } catch (error) {
            return res.status(500).json({ success: false, data: 'An error occurred while fetching the order.' });
        }

    },
    updateOrderById: async (req, res) => {
        const orderId = req.params.orderId;
        const updatedOrderData = req.body; // The updated order data should be in the request body

        try {
            const order = await Order.findByIdAndUpdate(orderId, updatedOrderData, { new: true });

            if (!order) {
                return res.status(404).json({ success: false, data: 'Order not found' });
            }

            return res.status(200).json({ success: true, data: order });
        } catch (error) {
            returnres.status(500).json({ success: false, data: 'An error occurred while updating the order.' });
        }

    },
    deleteOrderById: async (req, res) => {
        const orderId = req.params.orderId;

        try {
            const order = await Order.findByIdAndRemove(orderId);

            if (!order) {
                return res.status(404).json({ success: false, data: 'Order not found' });
            }

            return res.status(200).json({ success: true, data: "Order delete successfully" }); // Respond with a 204 status (No Content) on successful deletion
        } catch (error) {
            returnres.status(500).json({ success: false, data: 'An error occurred while deleting the order.' });
        }
    },

};


module.exports = OrderController;