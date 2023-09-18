const { errors } = require('../handlers/errors');
const Order = require('../models/Order');

/**
 * Finds an order by its ID.
 *
 * @param {string} id - The ID of the order to find.
 * @return {Promise} The order object that matches the given ID.
 */
const findOrderById = async (id) => {
  const order = await Order.findById(id).populate('services');

  if (!order) {
    const { name, code } = errors[404];
    throw new HttpError('Order not found', name, [], code);
  }

  return order;
};

module.exports = {
  findOrderById,
};
