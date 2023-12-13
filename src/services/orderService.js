const Order = require('../models/orderModel');
const ResponseHandler = require('../lib/utils/responseHandler');

class OrderService {
  static async createOrder(orderServices, totalfee, datetime) {
    try {
      // Check for existing order within 3 hours
      const orderDateTime = datetime ? new Date(datetime) : new Date();
      const updatedOrderData = {
        services: orderServices,
        totalfee,
        datetime: orderDateTime
      }
      const isOrderDateTimeIsCorrect = await checkIfOrderIsCorrect(orderDateTime);
      if (isOrderDateTimeIsCorrect) {
        return ResponseHandler.error('Another order exists within 3 hours.', 400);
      }

      const newOrder = new Order(updatedOrderData);
      await newOrder.save();

      return ResponseHandler.success(newOrder, 'Order created successfully', 201);
    } catch (error) {
      console.error('Error creating order:', error);
      return ResponseHandler.error();
    }
  }

  static async getOrderById(orderId) {
    try {
      const order = await Order.findById(orderId);

      if (!order) {
        return ResponseHandler.error('Order not found', 404);
      }

      return ResponseHandler.success(order);
    } catch (error) {
      console.error('Error getting order:', error);
      return ResponseHandler.error();
    }
  }

  static async updateOrderById(orderId, orderServices = [], totalfee, datetime) {
    try {
      if (datetime) {
        datetime = new Date();
        const isOrderDateTimeIsCorrect = await checkIfOrderIsCorrect(datetime);
        if (isOrderDateTimeIsCorrect) {
          return ResponseHandler.error('Another order exists within 3 hours.', 400);
        }
      }
      const updatedOrderData = {
        ...orderServices.length && { services: orderServices },
        ...totalfee && { totalfee },
        ...datetime && { datetime }
      }
      const updatedOrder = await Order.findByIdAndUpdate(orderId, updatedOrderData, { new: true });
      if (!updatedOrder) {
        return ResponseHandler.error('Order not found', 404);
      }

      return ResponseHandler.success(updatedOrder, 'Order updated successfully');
    } catch (error) {
      console.error('Error updating order:', error);
      return ResponseHandler.error();
    }
  }

  static async deleteOrderById(orderId) {
    try {
      const deletedOrder = await Order.findByIdAndDelete(orderId);

      if (!deletedOrder) {
        return ResponseHandler.error('Order not found', 404);
      }

      return ResponseHandler.success(deletedOrder, 'Order deleted successfully');
    } catch (error) {
      console.error('Error deleting order:', error);
      return ResponseHandler.error();
    }
  }

  static async getAllOrders() {
    try {
      const orders = await Order.find();
      return ResponseHandler.success(orders);
    } catch (error) {
      console.error('Error getting all orders:', error);
      return ResponseHandler.error();
    }
  }
}

// Check for existing order within 3 hours of the current Order DateTime
async function checkIfOrderIsCorrect(datetime) {
  const existingOrder = await Order.findOne({
    datetime: { $gte: datetime - 3 * 60 * 60 * 1000, $lte: datetime }
  });
  if (existingOrder) return true;
  return false;
}

module.exports = OrderService;
