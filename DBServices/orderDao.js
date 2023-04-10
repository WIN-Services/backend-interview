import Order from "../models/order.js";

class OrderDao {
  async createOrder(data) {
    return new Promise((resolve, reject) => {
      Order.create(data)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  async fetchOrder(orderId) {
    return new Promise((resolve, reject) => {
      Order.findOne({ _id: orderId })
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  async fetchAllOrders(filter = {}, skip = 0, limit = 0) {
    return new Promise(async (resolve, reject) => {
      try {
        const allOrders = await Order.find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit);

        resolve(allOrders);
      } catch (error) {
        reject(error);
      }
    });
  }

  async destroyOrder(orderId) {
    return new Promise((resolve, reject) => {
      Order.findOneAndDelete({ _id: orderId })
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  async updateOrder(orderId, data) {
    return new Promise((resolve, reject) => {
      Order.findOneAndUpdate({ _id: orderId }, { $set: data })
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }
}

export default OrderDao;
