const { errors } = require('../handlers/errors');
const { HttpSuccess, HttpError } = require('../handlers/apiResponse');

const { validateMongooseId } = require('../utils/mongoose');
const { getTimeAgoByHours } = require('../utils/date');

const { findOrderById } = require('../services/order');
const { validateServiceIds } = require('../services/serviceRecord');

const Order = require('../models/Order');

/**
 * Retrieves all orders with pagination.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next function.
 * @return {JSON} The response JSON - Returns a response JSON or error JSON.
 */
const getAllOrders = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    if (page < 1) {
      const { name, code } = errors[400];
      throw new HttpError('Invalid Page', name, [], code);
    }

    const skip = (page - 1) * limit;

    const ordersCount = await Order.countDocuments();

    if (!ordersCount) {
      const { name, code } = errors[404];
      throw new HttpError('Orders not found', name, [], code);
    }

    const isNextPage = ordersCount > skip + limit;

    const orders = await Order.find()
      .skip(skip)
      .limit(limit)
      .populate('services');

    const response = new HttpSuccess(
      'Orders',
      { is_next_page: isNextPage, orders },
      200
    );

    res.status(response.status_code).json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves an order by its ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {JSON} The response JSON - Returns a response JSON or error JSON.
 */
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.query;

    validateMongooseId;

    const order = await findOrderById(id);

    const response = new HttpSuccess('Order details', { order }, 200);

    res.status(response.status_code).json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * Creates an order based on the given service IDs.
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {function} next - The next function.
 * @return {JSON} The response JSON - Returns a response JSON or error JSON.
 */
const createOrder = async (req, res, next) => {
  try {
    const { service_ids } = req.body;

    const services = await validateServiceIds(service_ids);

    const totalFee = services.reduce((a, b) => a + b.fee, 0);

    const orderCreatedWithinThreeHours = await Order.findOne({
      createdAt: {
        $gte: getTimeAgoByHours(3),
      },
    });

    if (orderCreatedWithinThreeHours) {
      const { name, code } = errors[400];
      throw new HttpError(
        'Order already created within last 3 hours',
        name,
        [],
        code
      );
    }

    const order = new Order({
      total_fee: totalFee,
      services: services,
    });
    await order.save();

    const response = new HttpSuccess('Order created', order, 201);

    res.status(response.status_code).json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * Updates an order with the given ID and service IDs.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {JSON} The response JSON - Returns a response JSON or error JSON.
 */
const updateOrder = async (req, res, next) => {
  try {
    const { id, service_ids } = req.body;

    const order = await Order.findOne({
      _id: id,
      updatedAt: {
        $gte: getTimeAgoByHours(3),
      },
    });

    if (order) {
      const { name, code } = errors[400];
      throw new HttpError(
        'Order already updated within last 3 hours',
        name,
        [],
        code
      );
    }

    const services = await validateServiceIds(service_ids);

    const totalFee = services.reduce((a, b) => a + b.fee, 0);

    await Order.findByIdAndUpdate(id, {
      total_fee: totalFee,
      services,
    });

    const response = new HttpSuccess('Order updated', null, 200);

    res.status(response.status_code).json(response);
  } catch (error) {
    next(error);
  }
};

/**
 * Deletes an order.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {JSON} The response JSON - Returns a response JSON or error JSON.
 */
const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.query;

    validateMongooseId(id);

    await Order.findByIdAndDelete(id);

    const response = new HttpSuccess('Order deleted', null, 200);

    res.status(response.status_code).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
