const Order = require("../models/OrderModel");
const OrderUtils = require("../utils/CheckExistingOrders");
const ServiceUtils = require("../utils/CheckExistingService");

/*
 * Route - (POST) api/order
 * Usage - Creates a new order
 */
createOrder = async (req, res) => {
  try {
    if (!req.body || !req.body.services || !req.body.services.length) {
      return res.status(400).json({
        error: "Bad Request",
      });
    }

    const validServices = await ServiceUtils.checkIfServiceExists(
      req.body.services
    );
    if (!validServices) {
      return res.status(404).json({
        error: "Services not found",
      });
    }

    const getPastThreeHoursExistingOrders =
      await OrderUtils.getServiceOrdersBeforeThreeHours(req.body.services);
    if (
      getPastThreeHoursExistingOrders &&
      getPastThreeHoursExistingOrders.length
    ) {
      return res.status(405).json({
        error:
          "Cannot create order as there is an existing order in placed within last three hours",
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

/*
 * Route - (GET) api/order
 * Usage - Get all the orders
 */
getAllOrders = async (req, res) => {
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

/*
 * Route - GET api/order/:id
 * Usage- get order by ID
 */
getOrder = async (req, res) => {
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

/*
 * Route - (PUT) api/order/:id
 * Usage - Update order by ID
 */
updateOrder = async (req, res) => {
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

    const validServices = await ServiceUtils.checkIfServiceExists(
      req.body.services
    );
    if (!validServices) {
      return res.status(404).json({
        error: "Services not found",
      });
    }

    const existingOrdersOfPastThreeHours =
      await OrderUtils.getServiceOrdersBeforeThreeHours(req.body.services);
    if (
      existingOrdersOfPastThreeHours &&
      existingOrdersOfPastThreeHours.length
    ) {
      return res.status(405).json({
        message:
          "Cannot update order as there is an existing order in placed within last three hours",
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

/*
 * Route - (DELETE) api/order
 * Usage - Delete order
 */
deleteOrder = async (req, res) => {
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

module.exports = {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
};
