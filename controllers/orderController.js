
const Order = require('../models/order.js');

exports.getAllOrders = async (req, res) => {
try {
const orders = await Order.getAll();
res.json(orders);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Internal Server Error' });
}
};

exports.getOrderById= async (req, res) => {
try {
const order = await Order.getById();
res.json(order);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Internal Server Error' });
}
};

exports.createOrder = async (req, res) => {
const { id, datetime, totalfee, services } = req.body;

// Check if order with the same ID already exists
try {
const orderExists = await Order.checkOrderId(id);
if (orderExists) {
res.status(409).json({ error: 'Order with the same ID already exists' });
return;
                } 
// Check if there's a pre-existing order created within 3 hours
const existingOrders = await Order.checkExistingOrders(datetime);
if (existingOrders) {
  res.status(409).json({ error: 'Pre-existing order created within 3 hours' });
  return;
}

// Insert the new order into the database
  const newOrder = await Order.create(datetime, totalfee, services);
  console.log(newOrder)
  res.status(201).json(newOrder);
  
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Internal Server Error' });
}
};

exports.updateOrder = async (req, res) => {
const id = req.params.id;
const { datetime, totalfee, services } = req.body;

// Check if order with the specified ID exists
try {
const existingOrder = await Order.getById(id);
if (!existingOrder) {
res.status(404).json({ error: 'Order not found' });
return;
                }
// Check if there's a pre-existing order created within 3 hours
const existingOrders = await Order.checkExistingOrders(datetime);
if (existingOrders && existingOrder.datetime !== datetime) {
  res.status(409).json({ error: 'Pre-existing order created within 3 hours' });
  return;
}

// Update the order in the database
  const updatedOrder = await Order.update(id, datetime, totalfee, services);
  console.log(updatedOrder)
                res.json(updatedOrder);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Internal Server Error' });
}
};

exports.deleteOrder = async (req, res) => {
const id = req.params.id;

try {
const existingOrder = await Order.getById(id);
if (!existingOrder) {
res.status(404).json({ error: 'Order not found' });
return;
                }
await Order.delete(id);
                res.sendStatus(204);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Internal Server Error' });
}
};