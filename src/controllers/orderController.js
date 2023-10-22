const Order = require('../models/Order');

// Sample in-memory data store for orders (replace with a PostgreSQL database)
const orders = [];

const createOrder = (req, res) => {
  const { id, datetime, totalfee, services } = req.body;
  const newOrder = new Order(id, datetime, totalfee, services);

  // Check if an order with the same id exists
  const existingOrder = orders.find((order) => order.id === newOrder.id);

  if (existingOrder) {
    const threeHoursAgo = new Date();
    threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);

    if (existingOrder.datetime > threeHoursAgo) {
      return res.status(400).json({ error: 'Cannot create an order within 3 hours of an existing order.' });
    }
  }

  orders.push(newOrder);
  res.status(201).json(newOrder);
};

const getOrder = (req, res) => {
  const orderId = req.params.id;
  const order = orders.find((o) => o.id === orderId);

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  res.json(order);
};

const updateOrder = (req, res) => {
  const orderId = req.params.id;
  const updatedData = req.body;
  const orderIndex = orders.findIndex((o) => o.id === orderId);

  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }

  // Update order data
  const updatedOrder = { ...orders[orderIndex], ...updatedData };
  orders[orderIndex] = updatedOrder;

  res.json(updatedOrder);
};

const deleteOrder = (req, res) => {
  const orderId = req.params.id;
  const orderIndex = orders.findIndex((o) => o.id === orderId);

  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }

  // Remove the order from the list
  orders.splice(orderIndex, 1);

  res.sendStatus(204);
};

const getAllOrders = (req, res) => {
  res.json(orders);
};

module.exports = {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
};
