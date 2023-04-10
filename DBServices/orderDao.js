import Order from "../models/order";

class OrderDao {
  async createOrder(data) {
    try {
      new Order(data).save();
    } catch (err) {
      console.log("Error in createOrder-->", err);
    }
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
        let allOrders = await Order.find(filter)
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
      Order.findOneAndDelete(
        {
          _id: orderId,
        },
        (err, res) => {
          if (err) return reject(err);
          return resolve(res);
        }
      );
    });
  }
}

export default OrderDao;
