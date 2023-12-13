const OrderService = require('../services/orderService');

const orderController = {
  createOrder: async (req, res) => {
    const { services, totalfee, datetime } = req.body;
    const result = await OrderService.createOrder(services, totalfee, datetime);
    res.status(result.status).json(result);
  },

  getOrder: async (req, res) => {
    const orderId = req.params.id;
    const result = await OrderService.getOrderById(orderId);
    res.status(result.status).json(result);
  },

  updateOrder: async (req, res) => {
    const orderId = req.params.id;
    const { services: orderServices, totalfee, datetime } = req.body;
    const result = await OrderService.updateOrderById(orderId, orderServices, totalfee, datetime);
    res.status(result.status).json(result);
  },

  deleteOrder: async (req, res) => {
    const orderId = req.params.id;
    const result = await OrderService.deleteOrderById(orderId);
    res.status(result.status).json(result);
  },

  getAllOrders: async (req, res) => {
    const result = await OrderService.getAllOrders();
    res.status(result.status).json(result);
  },
};

module.exports = orderController;
