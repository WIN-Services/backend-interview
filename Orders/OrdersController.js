import OrderService from "./OrderService.js";
import { buildResponse } from "../Utility/utility.js";

export default class OrderController {
  constructor(central) {
    this.orderService = new OrderService(central);
  }

  async createOrder(req, res) {
    const data = await this.orderService.createOrder(req.body);
    buildResponse(data, req, res);
  }

  async updateOrder(req, res) {
    const data = await this.orderService.updateOrder(
      req.params.orderID,
      req.body
    );
    buildResponse(data, req, res);
  }

  async getOrder(req, res) {
    const data = await this.orderService.getOrder(req.params.orderID);
    buildResponse(data, req, res);
  }

  async getOrders(req, res) {
    const data = await this.orderService.getOrders();
    buildResponse(data, req, res);
  }

  async deleteOrder(req, res) {
    const data = await this.orderService.deleteOrder(req.params.orderID);
    buildResponse(data, req, res);
  }
}
