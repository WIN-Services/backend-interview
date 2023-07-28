const { ObjectId } = require('mongodb');
const Order= require('../models/orderModel');
const Service = require('../models/serviceModel');

const orderController = {};


orderController.fetchAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find().skip(skip).limit(limit);
    const newOrders = await Promise.all( orders.map(async (orderItem) =>{
      let newOrderItem = orderItem.populate("services","name");

      return newOrderItem;
    }));

    res.json({
      data: newOrders,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalOrders / limit),
      totalOrders,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

orderController.createOrder = async (req, res) => {
  try {
    const newOrder = req.body;
    const serviceIds = Promise.all(newOrder.services.map(async (orderItem) =>{
      let newOrderItem = Service.findOne({id: orderItem.id})

      return newOrderItem;
  }))
  const orderItemsIdsResolved =  await serviceIds;
  newOrder.services = orderItemsIdsResolved;
    newOrder.datetime = new Date();
    const existingOrder = await Order.findOne({ id: newOrder.id });

    if (existingOrder) {
        return res.status(400).json({ error: 'Order already exists' });
    }
    console.log(newOrder)
    const order = new Order(newOrder);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

orderController.getOrderById = async (req, res) => {
  try {
    const orderDetails = await Order.findById(req.params.orderId).populate(
      "services",
      "name"
    );
    console.log(orderDetails);
    res.status(200).json(orderDetails);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

orderController.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const updatedOrder = req.body;
    console.log(updatedOrder);
    const currentTime = new Date();
    const threeHoursAgo = new Date(currentTime.getTime() - 3 * 60 * 60 * 1000);
    const existingOrder = await Order.findOne({ id: newOrder.id });

    if (existingOrder) {
      const currentTime = new Date();
      const threeHoursAgo = new Date(currentTime.getTime() - 3 * 60 * 60 * 1000);

      if (existingOrder.datetime > threeHoursAgo) {
        return res.status(400).json({ error: 'Cannot create order within 3 hours of a pre-existing order' });
      }
    }

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


module.exports = orderController;