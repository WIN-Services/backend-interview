const BaseController = require("./base.controller");
const orderService = require("../services/order.service");

class OrderController extends BaseController {
  createOrder() {
    return this.asyncWrapper(async (req, res) => {
      const data = await orderService.createOrder(req,res);
      return res.status(201).json({
        status: "success",
        isSuccess: true,
        message: "Order created successfully.",
        data: data,
      });
    });
  }
  getOrderById() {
    return this.asyncWrapper(async (req, res) => {
      const data = await orderService.getOrderById(req, res);
      return res.status(200).json({
        status: "success",
        isSuccess: true,
        message: "Order listed successfully.",
        data: data,
      });
    });
  }
  getAllOrders() {
    return this.asyncWrapper(async (req, res) => {
      const data = await orderService.getAllOrders(req);
      return res.status(200).json({
        status: "success",
        isSuccess: true,
        message: "Orders listed successfully.",
        data: data,
      });
    });
  }
  updateOrder() {
    return this.asyncWrapper(async (req, res) => {
      const data = await orderService.updateOrder(req, res);
      return res.status(201).json({
        status: "success",
        isSuccess: true,
        message: "Order updated successfully.",
        data: data,
      });
    });
  }
}

module.exports = OrderController;
