const AppError = require("../utils/appError");
const Order = require("../models/order");

exports.createOrder = async (req,res) => {
  const { totalfee, services } = req.body;
  if (!totalfee) {
    return res
      .status(422)
      .json(new AppError("Please provide totalfee of the order", 422));
  }
  if (!services) {
    return res
      .status(422)
      .json(new AppError("Please provide services of the order", 422));
  }
  const data = await Order.create({ ...req.body });
  return data;
};

exports.updateOrder = async (req, res) => {
  const { orderId } = req.body;
  if (!orderId) {
    return res
      .status(422)
      .json(new AppError("Please provide correct orderId.", 422));
  }
  const data = await Order.findById({ _id: orderId });
  if (!data) {
    return res
      .status(404)
      .json(new AppError("No order exists with this orderId", 422));
  }
  let date = new Date();
  let timeDiff = date - data.updatedAt;
  if (timeDiff < 3 * 60 * 60 * 1000) {
    return res
      .status(422)
      .json(
        new AppError(
          "You can't edit within 3 hours of past create or edit",
          422
        )
      );
  }
  const updatedData = await Order.findByIdAndUpdate(
    { _id: orderId },
    { $set: { ...req.body } },
    { new: true }
  );
  return updatedData;
};

exports.getAllOrders = async (req, res) => {
  const { page, limit } = req.query;
  const data = await Order.find({}).populate({path: 'services', select: 'name'})
    .limit(limit)
    .skip((page - 1) * limit);
  return data;
};

exports.getOrderById = async (req, res) => {
  const { orderId } = req.query;
  if (!orderId) {
    res.status(400).json(new AppError("Please provide correct orderId", 400));
  }
  const data = await Order.findById({ _id: orderId }).populate({path: 'services', select: 'name'});
  if (!data) {
    res.status(404).json({ data: {}, message: "no order found!" });
  }
  return data;
};
