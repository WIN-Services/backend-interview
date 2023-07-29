const { Op } = require('sequelize');

const { Orders, Services } = require('../../db/models');
const {
  constants,
  errorMessage,
  BadRequestError,
  ServerError,
  NotFoundError,
  ForbiddenError
} = require('../../helpers');

const orderController = {
  async createOrder(reqBody) {
    const { totalFee, serviceIds } = reqBody;
    if (!totalFee) {
      throw new BadRequestError(errorMessage.FEE_REQUIRED);
    }
    if (!serviceIds || !Array.isArray(serviceIds) || !serviceIds.length) {
      throw new BadRequestError(errorMessage.SERVICE_REQUIRED);
    }
    try {
      let order = { totalFee };
      order = await Orders.create(order);
      const services = await Services.findAll({
        where: { id: { [Op.in]: serviceIds } }
      });
      await order.addServices(services);
      return order;
    } catch (error) {
      console.error(error);
      throw new ServerError(errorMessage.COMMON_ERROR);
    }
  },

  async updateOrder(orderId, reqBody) {
    const { totalFee, addServiceIds } = reqBody;
    const order = await Orders.findByPk(orderId);
    if (!order) {
      throw new NotFoundError(errorMessage.ORDER_NOT_FOUND);
    }
    const currentDate = new Date();
    const orderCreatedAt = new Date(order.createdAt);
    if ((currentDate - orderCreatedAt) < constants.ORDER_RESTRICTION_TIME) {
      throw new ForbiddenError(errorMessage.ORDER_CAN_NOT_UPDATE);
    }
    try {
      if (totalFee) {
        order.totalFee = totalFee;
        await order.save();
      }
      if (addServiceIds && Array.isArray(addServiceIds) && addServiceIds.length) {
        const services = await Services.findAll({
          where: { id: { [Op.in]: addServiceIds } }
        });
        await order.addServices(services);
      }
      return order;
    } catch (error) {
      console.error(error);
      throw new ServerError(errorMessage.COMMON_ERROR);
    }
  },

  async getOrders() {
    const orders = await Orders.findAll({
      include: [{
        model: Services,
        attributes: ['id', 'name'],
        through: { attributes: [] }
      }]
    });
    return orders;
  },

  async getOrderById(orderId) {
    const order = await Orders.findByPk(orderId, {
      include: [{
        model: Services,
        attributes: ['id', 'name'],
        through: { attributes: [] }
      }]
    });
    if (!order) {
      throw new NotFoundError(errorMessage.ORDER_NOT_FOUND);
    }
    return order;
  },

  async deleteOrderById(orderId) {
    const order = await Orders.findByPk(orderId);
    if (!order) {
      throw new NotFoundError(errorMessage.ORDER_NOT_FOUND);
    }
    await order.destroy();
    return { success: true };
  }
};

module.exports = orderController;
