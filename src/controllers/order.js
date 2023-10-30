const Order = require("../models/order");

exports.fetchAllOrderDetails = async (req, res) => {
    try {
        const orders = await Order.find().select(
            "id datetime totalfee services"
        );
        if (!orders || orders.length === 0) {
            return res.status(200).json({
                totalNumberOfOrders: 0,
                orders: [],
            });
        }
        res.status(200).json({
            totalNumberOfOrders: orders.length,
            orders,
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.placeOrder = async (req, res) => {
    try {
        const { id, totalfee, services } = req.body;
        const existingOrder = await Order.findOne({ id });

        if (existingOrder) {
            const timeDifferenceInHours = Math.abs(
                (existingOrder.datetime - new Date()) / 36e5
            );

            if (timeDifferenceInHours < 3) {
                return res.status(400).json({
                    message:
                        "A new order cannot be placed within 3 hours of a previous order.",
                });
            }
        }

        const datetime = new Date();
        const order = new Order({
            id,
            datetime,
            totalfee,
            services,
        });

        await order.save();

        return res.status(201).json({
            message: "Order placed successfully",
            placedOrder: order,
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.fetchOrderDetails = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const order = await Order.findOne({ id: orderId });
        if (!order) {
            return res.status(404).json({
                message: "Order not found",
            });
        }
        res.status(200).json({
            order,
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const deletedOrder = await Order.findOneAndDelete({ id: orderId });
        if (!deletedOrder) {
            return res.status(404).json({
                message: "Order not found",
            });
        }
        res.status(200).json({
            message: "Order deleted successfully",
            deletedOrder,
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.updateOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { id, totalfee, services } = req.body;
        const existingOrder = await Order.findOne({ id });
        if (existingOrder) {
            const datetime = existingOrder.datetime;
            const timeDifferenceInHours = Math.abs(
                (existingOrder.datetime - new Date(datetime)) / 36e5
            );
            if (timeDifferenceInHours < 3) {
                return res.status(400).json({
                    message:
                        "Order details cannot be updated within 3 hours of a previous order.",
                });
            } else {
                const updatedOrder = await Order.findOneAndUpdate(
                    { id: orderId },
                    { id, totalfee, services },
                    { new: true }
                );
                return res.status(200).json({
                    message: "Order updated successfully",
                    updatedOrder,
                });
            }
        } else {
            console.log("Entered in ELSE");
            const updatedOrder = await Order.findOneAndUpdate(
                { id: orderId },
                { id, totalfee, services }
            );
            if (!updatedOrder) {
                return res.status(404).json({
                    message: "Order not found",
                });
            }
            return res.status(200).json({
                message: "Order updated successfully",
                updatedOrder,
            });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};
