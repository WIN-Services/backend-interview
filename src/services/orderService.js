const { Sequelize } = require('sequelize');
const Order = require('../models/orderModel');
const Service = require('../models/serviceModel');

// Define the orderService object to handle order-related operations
const orderService = {
// Method to retrieve all orders with associated services
  getAllOrders: async () => {
    try {
      const orders = await Order.findAll({ include: Service });
      return orders;
    } catch (error) {
      throw new Error('Error fetching orders');
    }
  },

// Method to retrieve an order by its ID with associated services
  getOrderById: async (orderId) => {
    try {
      const order = await Order.findByPk(orderId, { include: Service });
      if (!order) {
        const error = new Error('Order not found');
        error.name = 'OrderNotFoundError';
        throw error;
      }
      return order;
    } catch (error) {
      throw error;
    }
  },

// Method to create a new order with validation to ensure it's not within 3 hours of an existing order
  createOrder: async (datetime, totalfee, services) => {
    try {
      const threeHoursAgo = new Date(new Date() - 3 * 60 * 60 * 1000);
      // Check for existing orders within the last 3 hours
      const existingOrders = await Order.findAll({ where: { datetime: { [Sequelize.Op.gt]: threeHoursAgo } } });
      if (existingOrders.length > 0) {
        const error = new Error('Cannot create order within 3 hours of an existing order');
        error.name = 'PreexistingOrderError';
        throw error;
      }

      // Create the new order and associate services
      const newOrder = await Order.create({ datetime, totalfee });
      await newOrder.setServices(services);
      return await Order.findByPk(newOrder.id, { include: Service });
    } catch (error) {
      throw error;
    }
  },

// Method to update an existing order with validation to ensure it's not within 3 hours of another order
  updateOrder: async (orderId, datetime, totalfee, services) => {
    try {
      const existingOrder = await Order.findByPk(orderId);
      if (!existingOrder) {
        const error = new Error('Order not found');
        error.name = 'OrderNotFoundError';
        throw error;
      }

      const threeHoursAgo = new Date(new Date() - 3 * 60 * 60 * 1000);

      // Check for existing orders within the last 3 hours, excluding the current order
      const existingOrders = await Order.findAll({
        where: {
          id: { [Sequelize.Op.not]: orderId },
          datetime: { [Sequelize.Op.gt]: threeHoursAgo }
        },
      });
      if (existingOrders.length > 0) {
        const error = new Error('Cannot update order within 3 hours of an existing order');
        error.name = 'PreexistingOrderError';
        throw error;
      }

      // Update the existing order fields and associated services
      existingOrder.datetime = datetime;
      existingOrder.totalfee = totalfee;
      await existingOrder.setServices(services);
      await existingOrder.save();
      return await Order.findByPk(orderId, { include: Service });
    } catch (error) {
      throw error;
    }
  },

// Method to delete an order by its ID
  deleteOrder: async (orderId) => {
    try {
      const existingOrder = await Order.findByPk(orderId);
      if (!existingOrder) {
        const error = new Error('Order not found');
        error.name = 'OrderNotFoundError';
        throw error;
      }
      await existingOrder.destroy(); // Delete the order from the database
    } catch (error) {
      throw error;
    }
  },
};

module.exports = orderService; // Export the orderService object for use in other parts of the application
