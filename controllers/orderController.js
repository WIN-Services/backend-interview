const Order = require("../models/order");
const calculateHoursDifference = require("../util/hourDifference");

const createOrder = async (req, res) => {
  try {
    req.body.datetime = new Date().toString();
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOrderById = async (req, res) => {
  const orderId = req.params.id;

  try {
    const order = await Order.findById(orderId);
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const previousOrder = await Order.findById(orderId);
    const previousDate = new Date(previousOrder.datetime);
    const pastDate = Date.parse(previousDate.toString());
    const hoursDifference = calculateHoursDifference(pastDate);

    if (hoursDifference < 3) {
      return res.status(304).json({ error: "Wait for 3 hours to be completed" });
    }
    req.body.datetime = new Date().toString();
    const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
      new: true,
    });
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    const deletedOrder = await Order.findOneAndDelete({_id: orderId});
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(deletedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
