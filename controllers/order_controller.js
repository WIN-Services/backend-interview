const Order = require("../models/order");

exports.createOrder = async (req, res) => {
  try {
    if (!req.body.services.length) {
      return res.status(400).json({
        error: "Bad Request",
      });
    }

    const order = new Order({
      totalfee: req.body.totalfee,
      services: req.body.services,
    });
    const savedOrder = await order.save();
    res.status(201).json({
      success: true,
      data: savedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};


exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.status(400).json({
        error: "Bad Request",
      });
    }

    const order = await Order.findById(req.params.id);

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};


exports.updateOrder = async (req, res) => {
  try {
    if (
      !req.params ||
      !req.params.id ||
      !req.body ||
      !req.body.services ||
      !req.body.services.length
    ) {
      return res.status(400).json({
        error: "Bad Request",
      });
    }

    const order = {
      datetime: req.body.datetime ? Date.parse(req.body.datetime) : Date.now(),
      totalfee: req.body.totalfee ? req.body.totalfee : 0,
      services: req.body.services,
    };
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, order, {
      upsert: true,
    });
    res.status(200).json({
      success: true,
      data: updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.status(400).json({
        error: "Bad Request",
      });
    }

    const order = await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

