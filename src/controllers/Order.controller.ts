import { Request, Response } from "express";
import { CreateOrderInput } from "../interfaces/order.interface";
import OrderService from "../services/order.services";
import CommonController from "./commonController";

const commonController = new CommonController();
const order = new OrderService();

class OrderController {
  constructor() {}

  async createOrder(req: Request, res: Response) {
    try {
      if (!req.body.totalFee) {
        throw "form body is not as expected";
      }

      const data= {
        totalFee: req.body.totalFee,
      };

      const newOrder = await order.createOrder(data);

      return res.status(201).json({
        message: "success",
        status: "created",
        data: newOrder,
      });
    } catch (err) {
      return res.status(500).json({
        message: "failure",
        status: "not created",
        data: { error: err },
      });
    }
  }

  async fetchAllOrders(req: Request, res: Response) {
    try {
      const orders = await order.fetchAllOrders();
      return res.status(200).json({
        message: "success",
        status: "ok",
        data: orders,
      });
    } catch (err) {
      return res.status(500).json({
        message: "failure",
        status: "not ok",
        data: { error: err },
      });
    }
  }

  async getOrder(req: Request, res: Response) {
    try {
      const orderId = parseInt(req.params.id);
      const orderfetched = await order.fetchOrder(orderId);
      return res.status(200).json({
        message: "success",
        status: "ok",
        data: orderfetched,
      });
    } catch (err) {
      return res.status(500).json({
        message: "failure",
        status: "not ok",
        data: { error: err },
      });
    }
  }

  async destroyOrder(req: Request, res: Response) {
    try {
      const orderId = parseInt(req.params.id);
      const orderfetched = await order.destroyOrder(orderId);
      return res.status(200).json({
        message: "success",
        status: "deleted",
        data: orderfetched,
      });
    } catch (err) {
      return res.status(500).json({
        message: "success",
        status: "not deleted",
        data: { error: err },
      });
    }
  }

  async addServiceToOrder(req: Request<{ serviceId: string, orderId: string }>, res: Response) {
    try {
      const { serviceId, orderId } = req.params;
      const result = await commonController.addServiceInOrder({ serviceId: +serviceId, orderId: +orderId });
      return res.status(202).json(result);
    } catch (err) {
      return res.status(406).json({
        message: "failure",
        status: "not updated",
        data: { error: err },
      });
    }
  }

}

export default OrderController;
