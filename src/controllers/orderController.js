// Import the orderService module responsible for handling order-related business logic
const orderService = require('../services/orderService');

// Define the orderController object to handle HTTP requests related to orders
const orderController = {
  // Function to retrieve all orders
  getAllOrders: async (req, res, next) => {
    try {
      // Call the getAllOrders function from the orderService module to fetch all orders
      const orders = await orderService.getAllOrders();
      // Send the fetched orders as a JSON response
      res.json(orders);
    } catch (error) {
      // Handle errors and send a 500 error response if an error occurs
      console.error(error);
      res.status(500).json({ error: 'Something went wrong!' });
    }
  },

  // Function to retrieve a specific order by its ID
  getOrderById: async (req, res, next) => {
    try {
      // Extract the order ID from the request parameters
      const orderId = req.params.id;
      // Call the getOrderById function from the orderService module to fetch the order by its ID
      const order = await orderService.getOrderById(orderId);
      // If the order is not found, send a 404 error response
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      // Send the fetched order as a JSON response
      res.json(order);
    } catch (error) {
      // Handle errors and send a 500 error response if an error occurs
      console.error(error);
      res.status(500).json({ error: 'Something went wrong!' });
    }
  },

  // Function to create a new order
  createOrder: async (req, res, next) => {
    try {
      // Extract totalfee and services from the request body
      const { totalfee, services } = req.body;
      // Get the current datetime
      const datetime = new Date();
      // Call the createOrder function from the orderService module to create a new order
      const newOrder = await orderService.createOrder(datetime, totalfee, services);
      // Send the newly created order as a JSON response
      res.status(201).json(newOrder);
    } catch (error) {
      // Handle errors and send a 401 error response if an error occurs
      console.error(error);
      res.status(401).json({ error: 'Cannot create order within 3 hours of an existing order' });
    }
  },

  // Function to update an existing order
  updateOrder: async (req, res, next) => {
    try {
      // Extract order ID, datetime, totalfee, and services from the request body
      const orderId = req.params.id;
      let { datetime, totalfee, services } = req.body;
      // If datetime is not provided, set it to the current datetime
      if (!datetime) {
        datetime = new Date();
      }
      // Call the updateOrder function from the orderService module to update the order
      const order = await orderService.updateOrder(orderId, datetime, totalfee, services);
      // Send the updated order as a JSON response
      res.json(order);
    } catch (error) {
      // Handle errors and send a 400 error response if an error occurs
      console.error(error);
      res.status(400).json({ error: 'Cannot update order within 3 hours of an existing order' });
    }
  },

  // Function to delete an existing order
  deleteOrder: async (req, res, next) => {
    try {
      // Extract order ID from the request parameters
      const orderId = req.params.id;
      // Call the deleteOrder function from the orderService module to delete the order
      await orderService.deleteOrder(orderId);
      // Send a 204 (No Content) response if deletion is successful
      res.status(204).json({ msg: 'Deleted successfully' });
    } catch (error) {
      // Handle errors and send a 500 error response if an error occurs
      console.error(error);
      res.status(500).json({ error: 'Something went wrong!' });
    }
  }
};

// Export the orderController object to make it accessible in other parts of the application
module.exports = orderController;
