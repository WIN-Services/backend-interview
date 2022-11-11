const { msg } = require("../../../config/message");
const asyncHandler = require("../../middleware/async");
const ErrorResponse = require("../../helper/errorResponse");
const Orders = require("../models/order.model");

// @desc    Add Orders
// @route   POST/api/v1/order/create
// access   Public
exports.addOrder = asyncHandler(async (req, res, next) => {
  if (!req.body.totalfee) {
    return next(new ErrorResponse(msg.requiredTotalfee, 409));
  }
  if (!req.body.service) {
    return next(new ErrorResponse(msg.requiredServices, 409));
  }

  let existOrder = await Orders.find({
    $and: [
      {
        createdAt: { $gt: new Date(Date.now() - 3 * 60 * 60 * 1000) },
      },
      {
        services: { $in: req.body.service },
      },
    ],
  });

  if (existOrder && existOrder.length > 0) {
    return next(new ErrorResponse(msg.notCreateOrder, 409));
  }
  let order = await Orders.create({
    totalfee: req.body.totalfee,
    services: [req.body.service],
  });

  res.status(200).json({
    success: true,
    message: "Order Created Successfully",
    data: order,
  });
});

// @desc    Update Order
// @route   POST/api/v1/order/update
// access   Public
exports.updateOrder = asyncHandler(async (req, res, next) => {
  if (!req.params.orderId) {
    return next(new ErrorResponse(msg.requiredOrder, 409));
  }

  let existOrder = await Orders.find({
    $and: [
      {
        createdAt: { $gt: new Date(Date.now() - 3 * 60 * 60 * 1000) },
      },
      {
        services: { $in: req.body.service },
      },
    ],
  });
  if (existOrder && existOrder.length > 0) {
    return next(new ErrorResponse(msg.notCreateOrder, 409));
  }

  let payload = {};
  if (req.body.service) {
    payload.services = [req.body.service];
  }
  if (req.body.totalfee) {
    payload.totalfee = req.body.totalfee;
  }

  let order = await Orders.findByIdAndUpdate(req.params.orderId, payload, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Order Updated Successfully",
    data: order,
  });
});

// @desc    Delete Order
// @route   POST/api/v1/order/delete
// access   Public
exports.deleteOrder = asyncHandler(async (req, res, next) => {
  if (!req.params.orderId) {
    return next(new ErrorResponse(msg.requiredServices, 409));
  }
  let order = await Orders.findByIdAndDelete(req.params.orderId);

  res.status(200).json({
    success: true,
    message: `Order Deleted`,
  });
});

// @desc    Get All Orders
// @route   POST/api/v1/order/all
// access   Public
exports.allOrder = asyncHandler(async (req, res, next) => {
  let orders = await Orders.find({});

  res.status(200).json({
    success: true,
    message: `All Orders fetched Successfully`,
    data: orders,
  });
});

// @desc    Get Orders
// @route   POST/api/v1/order/filter
// access   Public
exports.getOrdersByFilters = asyncHandler(async (req, res, next) => {
  let innerQuery = {};
  if (req.query.orderId) {
    innerQuery._id = req.query.orderId;
  }

  let order = await Orders.find(innerQuery).populate('services','name');

  res.status(200).json({
    success: true,
    message: `Orders fetched Successfully`,
    data: order,
  });
});
