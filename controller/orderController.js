const Order = require("../schema/orderSchema");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.json({
      totalOrder: orders.length,
      orders: orders,
      message: "Orders get Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const createOrders = async (req, res) => {
  try {
    if (Object.keys(req.body).length) {
      // Check if there is an order within the last 3 hours
      const threeHoursAgo = new Date();
      threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);
      const existingOrder = await Order.findOne({
        datetime: { $gt: threeHoursAgo },
      });
      if (existingOrder) {
        return res.status(400).json({
          error: "Order can't be created, An order has been created within the last 3 hours.",
        });
      }
      const newOrder = new Order(req.body);
      await newOrder.save();
      return res.status(201).json({
        message: "Orders created successfully",
        data: newOrder,
      });
    } else {
      return res.json({
        message: "Data is empty to create orders",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateOrderById = async (req, res) => {
  try {
    // Find the existing order
    const existingOrder = await Order.findById(req.params.id);

    // Check if the order was created more than 3 hours ago
    const afterthreeHours = new Date();
    afterthreeHours.setHours(afterthreeHours.getHours() + 3);

    if (existingOrder.datetime < afterthreeHours) {
      return res
        .status(400)
        .json({
          error:
            "Order cannot be updated; it was created less than 3 hours ago.",
        });
    }
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    return res.json({
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteOrderById = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    return res.json({
      message: "Order deleted successfully",
      data: deletedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrders,
  updateOrderById,
  deleteOrderById,
};
