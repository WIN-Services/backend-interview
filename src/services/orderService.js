// Import necessary modules and models
const { Sequelize } = require('sequelize');
const Order = require('../models/orderModel');
const Service = require('../models/serviceModel');

// Define the orderService object to handle order-related operations
const orderService = {
  // Method to retrieve all orders with associated services
  getAllOrders: async () => {
    try {
      const orders = await Order.findAll({
        include: Service, // Include associated services in the result
      });
      return orders;
    } catch (error) {
      throw new Error('Error fetching orders');
    }
  },

  // Method to retrieve an order by its ID with associated services
  getOrderById: async (orderId) => {
    try {
      return await Order.findByPk(orderId, { include: Service });
    } catch (error) {
      console.error('Error fetching order by ID:', error);
      throw error;
    }
  },

  // Method to create a new order with validation to ensure it's not within 3 hours of an existing order
  createOrder: async (datetime, totalfee, services) => {
    try {
      const threeHoursAgo = new Date(new Date() - 3 * 60 * 60 * 1000);

      // Check for existing orders within the last 3 hours
      const existingOrders = await Order.findAll({
        where: {
          datetime: { [Sequelize.Op.gt]: threeHoursAgo },
        },
      });

      if (existingOrders.length > 0) {
        throw new Error('Cannot create order within 3 hours of an existing order');
      }

      // Create the new order and associate services
      const newOrder = await Order.create({ datetime, totalfee });
      await newOrder.setServices(services);
      return await Order.findByPk(newOrder.id, { include: Service });
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },

  // Method to update an existing order with validation to ensure it's not within 3 hours of another order
  updateOrder: async (orderId, datetime, totalfee, services) => {
    try {
      const existingOrder = await Order.findByPk(orderId);
      if (!existingOrder) {
        throw new Error('Order not found');
      }

      const threeHoursAgo = new Date(new Date() - 3 * 60 * 60 * 1000);

      // Check for existing orders within the last 3 hours, excluding the current order
      const existingOrders = await Order.findAll({
        where: {
          id: { [Sequelize.Op.not]: orderId },
          datetime: { [Sequelize.Op.gt]: threeHoursAgo },
        },
      });

      if (existingOrders.length > 0) {
        throw new Error('Cannot update order within 3 hours of an existing order');
      }

      // Update the existing order fields and associated services
      existingOrder.datetime = datetime;
      existingOrder.totalfee = totalfee;
      await existingOrder.setServices(services);
      await existingOrder.save();

      return await Order.findByPk(orderId, { include: Service });
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  },

  // Method to delete an order by its ID
  deleteOrder: async (orderId) => {
    try {
      const existingOrder = await Order.findByPk(orderId);
      if (!existingOrder) {
        throw new Error('Order not found');
      }
      await existingOrder.destroy(); // Delete the order from the database
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  },
};

module.exports = orderService; // Export the orderService object for use in other parts of the application
