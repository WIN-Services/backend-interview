// controllers/orderController.js
const Order = require('../models/orderModel');

const orderController = {};

orderController.createOrder = async (req, res) => {
  try {
    const newOrder = req.body;
    const existingOrder = await Order.findOne({ id: newOrder.id });

    if (existingOrder) {
      const currentTime = new Date();
      const threeHoursAgo = new Date(currentTime.getTime() - 3 * 60 * 60 * 1000);

      if (existingOrder.datetime > threeHoursAgo) {
        return res.status(400).json({ error: 'Cannot create order within 3 hours of a pre-existing order' });
      }
    }

    const order = new Order(newOrder);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

orderController.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updatedOrder = req.body;

    await Order.findOneAndUpdate({ id: orderId }, updatedOrder);
    res.status(200).json({ message: 'Order updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

orderController.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    await Order.findOneAndDelete({ id: orderId });
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

orderController.getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find().skip(skip).limit(limit);
    res.json({
      data: orders,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = orderController;
