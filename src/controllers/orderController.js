const orderService = require('../services/orderService');
const Order = require('../models/orderModel'); 
const Service = require('../models/serviceModel')

const orderController = {
  getAllOrders: async (req, res, next) => {
    try {
      const orders = await orderService.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong!' });
    }
  },

  getOrderById: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const order = await orderService.getOrderById(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong!' });
    }
  },

  createOrder: async (req, res, next) => {
    try {
      const { totalfee, services } = req.body;
      
      const datetime = new Date();
      const newOrder = await orderService.createOrder(datetime, totalfee, services);
      res.status(201).json(newOrder);
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Cannot create order within 3 hours of an existing order' });
    }
  },

  updateOrder: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      let { datetime, totalfee, services } = req.body;
      if (!datetime) {
        datetime = new Date();
      }
      const order = await orderService.updateOrder(orderId, datetime, totalfee, services);
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Cannot update order within 3 hours of an existing order' });
    }
  },
  deleteOrder: async (req, res, next) => {
    try {
      const orderId = req.params.id;
      await orderService.deleteOrder(orderId);
      res.status(204).json({msg:"deletd sucessfully"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong!' });
    }
  }
};

module.exports = orderController;
