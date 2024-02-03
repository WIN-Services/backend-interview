import { Request, Response } from "express";
import ordersHelper from "../helpers/orders.helper";
import { RESPONSES } from "../../constants/responses";
import { MESSAGES } from "../../constants/messages";

export class OrdersController {
  constructor() {}

  async getAllOrders(req: Request, res: Response) {
    try {
      const limit = Number(req.query.limit);
      const offset = Number(req.query.offset);

      const getAllOrders: any = await ordersHelper.getAllOrders(limit, offset);
      return res.status(RESPONSES.SUCCESS).send({
        data: getAllOrders,
        message: MESSAGES.ORDERS.FETCH.SUCCESS,
        error: false,
      });
    } catch (error: any) {
      return res.status(RESPONSES.BADREQUEST).send({
        message: MESSAGES.ORDERS.FETCH.FAIL,
        error: true,
      });
    }
  }

  async createOrder(req: Request, res: Response) {
    try {
      const { userId, service } = req.body;
      const createOrder: any = await ordersHelper.createOrder(
        userId,
        Number(service)
      );
      if (!createOrder.error) {
        return res.status(RESPONSES.SUCCESS).send({
          data: createOrder,
          message: MESSAGES.ORDERS.CREATE.SUCCESS,
          error: false,
        });
      }
      return res.status(RESPONSES.BADREQUEST).send({
        error: true,
        message: createOrder.message,
      });
    } catch (error: any) {
      return res.status(RESPONSES.BADREQUEST).send({
        message: MESSAGES.ORDERS.CREATE.FAIL,
        error: true,
      });
    }
  }

  async removeService(req: Request, res: Response) {
    try {
      const { orderId, service } = req.body;
      const createOrder: any = await ordersHelper.updateOrder(orderId, service);
      if (!createOrder.error) {
        return res.status(RESPONSES.SUCCESS).send({
          data: createOrder,
          message: MESSAGES.ORDERS.UPDATE.SUCCESS,
          error: false,
        });
      }
      return res.status(RESPONSES.BADREQUEST).send({
        error: true,
        message: createOrder.message,
      });
    } catch (error: any) {
      return res.status(RESPONSES.BADREQUEST).send({
        message: MESSAGES.ORDERS.UPDATE.FAIL,
        error: true,
      });
    }
  }

  async deleteOrder(req: Request, res: Response) {
    try {
      const { orderId } = req.body;
      const createOrder: any = await ordersHelper.deleteOrder(orderId);
      if (!createOrder.error) {
        return res.status(RESPONSES.SUCCESS).send({
          data: createOrder,
          message: MESSAGES.ORDERS.UPDATE.SUCCESS,
          error: false,
        });
      }
      return res.status(RESPONSES.BADREQUEST).send({
        error: true,
        message: createOrder.message,
      });
    } catch (error: any) {
      return res.status(RESPONSES.BADREQUEST).send({
        message: MESSAGES.ORDERS.UPDATE.FAIL,
        error: true,
      });
    }
  }
}

export default new OrdersController();
