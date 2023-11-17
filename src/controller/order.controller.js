const Order = require("../models/orders.entity");
const moment = require("moment");

/**
 * Creates an Order 
 */
const createOrder = async (req, res) => {
  try {
    const { id } = req.body
    const threeHoursAgo = moment().subtract(3, "hours");
    const existingOrder = await Order.findOne({ id: id, createdAt: { $gt: threeHoursAgo } });
    if (existingOrder) {
      return res.status(400).json({ error: "Order already exists!" });
    }
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


/**
 *  Gets Order by id 
 */
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    //Populate Services data into orders data
    const order = await Order.findOne({ _id: id }).populate({
      path: "services",
      select: "id -_id",
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/**
 * Get all Orders 
 */
const getAllOrders = async (req, res) => {
  try {
    //Populate Services Error
    const orders = await Order.find().populate({
      path: "services",
      select: "id -_id",
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/**
 * Updates Order By id
 */
const updateOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const existingOrder = await Order.findOne({ _id: id });
    if (!existingOrder) {
      return res
        .status(404)
        .json({
          error: "Order not found ",
        });
    } else {
      const { createdAt, updatedAt } = existingOrder
      // Parse createdAt using moment
      const createdAtTime = moment(createdAt);
      const updatedAtTime = moment(updatedAt);
      // Calculate time for three hours ago using moment
      const threeHoursAgo = moment().subtract(3, "hours");

      // Check if createdAt is within the last 3 hour
      if (createdAtTime.isSameOrAfter(threeHoursAgo) || updatedAtTime.isSameOrAfter(threeHoursAgo)) {
        return res
          .status(400)
          .json({
            error: "Cannot update before until 3 hours from order creation",
          });
      } else {
        req.body.updatedAt = moment();
        const order = await Order.findByIdAndUpdate(id, { $set: req.body }, {
          new: true,
        });
        if (!order) {
          return res.status(404).json({ error: "Order not found" });
        }
        res.json(order);
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/**
 * Deletes Order By id
 */
const deleteOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrderById,
  deleteOrderById,
};
