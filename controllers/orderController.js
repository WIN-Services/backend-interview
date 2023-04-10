import OrderDao from "../DBServices/orderDao.js";

const orderDao = new OrderDao();

class OrderController {
  constructor() {}

  async createOrder(req, res) {
    try {
      if (!req.body.totalFee) {
        throw "form body is not as expected";
      }
      const data = {
        totalFee: req.body.totalFee,
      };
      const newOrder = await orderDao.createOrder(data);
      return res
        .status(201)
        .json({ message: "success", status: "created", data: newOrder });
    } catch (err) {
      return res.status(500).json({
        message: "failure",
        status: "not created",
        data: { error: err },
      });
    }
  }

  async fetchAllOrders(req, res) {
    try {
      const orders = await orderDao.fetchAllOrders();
      return res
        .status(200)
        .json({ message: "success", status: "ok", data: orders });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "failure", status: "not ok", data: { error: err } });
    }
  }

  async getOrder(req, res) {
    try {
      const { id: orderId } = req.params;
      const order = await orderDao.fetchOrder(orderId);
      return res
        .status(200)
        .json({ message: "success", status: "ok", data: order });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "failure", status: "not ok", data: { error: err } });
    }
  }

  async destroyOrder(req, res) {
    try {
      const { id: orderId } = req.params;
      const order = await orderDao.destroyOrder(orderId);
      return res
        .status(200)
        .json({ message: "success", status: "deleted", data: order });
    } catch (err) {
      return res.status(500).json({
        message: "failure",
        status: "not deleted",
        data: { error: err },
      });
    }
  }
}

export default OrderController;
