const Order = require("../models/order");

//! Create a new order
exports.createOrder = async (req, res) => {
  try {
    if(Object.keys(req.body).length === 0){
      return res.status(400).json({msg: 'Payload not found'})
    }
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Error creating the order" });
  }
};

//! Get all orders
exports.getAllOrders = async (req, res) => {
  console.log("get orders");
  try {
    const orders = await Order.find().populate("services", "name");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Error fetching orders" });
  }
};

//! Get an order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "services",
      "name"
    );
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Error fetching the order" });
  }
};

//! Update an order by ID
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("services", "name");
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Error updating the order" });
  }
};

//! Delete an order by ID
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting the order" });
  }
};
