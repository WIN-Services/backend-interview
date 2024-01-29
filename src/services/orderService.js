const { Sequelize } = require('sequelize');
const Order = require('../models/orderModel');
const Service = require('../models/serviceModel');

const orderService = {
  getAllOrders: async () => {
    try {
      const orders = await Order.findAll({
        include: Service,
      });
      return orders;
    } catch (error) {
      throw new Error('Error fetching orders');
    }
  },

  getOrderById: async (orderId) => {
    try {
      return await Order.findByPk(orderId, { include: Service });
    } catch (error) {
      console.error('Error fetching order by ID:', error);
      throw error;
    }
  },

  createOrder: async (datetime, totalfee, services) => {
    try {
      const threeHoursAgo = new Date(new Date() - 3 * 60 * 60 * 1000);
  
      const existingOrders = await Order.findAll({
        where: {
          datetime: { [Sequelize.Op.gt]: threeHoursAgo },
        },
      });
  
      if (existingOrders.length > 0) {
        throw new Error('Cannot create order within 3 hours of an existing order');
      }
  
      const newOrder = await Order.create({ datetime, totalfee });
      await newOrder.setServices(services);
      return await Order.findByPk(newOrder.id, { include: Service });
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  },
  updateOrder: async (orderId, datetime, totalfee, services) => {
    try {
      const existingOrder = await Order.findByPk(orderId);
      if (!existingOrder) {
        throw new Error('Order not found');
      }
  
      const threeHoursAgo = new Date(new Date() - 3 * 60 * 60 * 1000);
  
      const existingOrders = await Order.findAll({
        where: {
          id: { [Sequelize.Op.not]: orderId },
          datetime: { [Sequelize.Op.gt]: threeHoursAgo },
        },
      });
  
      if (existingOrders.length > 0) {
        throw new Error('Cannot update order within 3 hours of an existing order');
      }
  
      // Update the existing order fields
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

  deleteOrder: async (orderId) => {
    try {
      const existingOrder = await Order.findByPk(orderId);
            if (!existingOrder) {
        throw new Error('Order not found');
      }
      await existingOrder.destroy(); 
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  },
};

module.exports = orderService;
