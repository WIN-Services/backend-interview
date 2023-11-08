import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { orderService } from '../services/orderService';

export class OrderController {
  public static route = '/api/order';
  private orderService: orderService;
  public router: Router;

  constructor() {
    this.router = Router();
    this.orderService = new orderService();
    this.init();
  }

  private init() {
    this.router.get('/', this.getAllOrders);
    this.router.get('/:id', this.getOrderById);
    this.router.post('/', this.createOrder);
    this.router.put('/:id', this.updateOrder);
    this.router.delete('/:id', this.deleteOrder);
  }

  /**
   * Get all orders
   * @param req - no params
   * @param res - return all orders
   */
  private getAllOrders = async (req, res) => {
    try {
      const orders = await this.orderService.getAllOrders();
      res.status(StatusCodes.OK).json(orders);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  };

  /**
   * Get order by id
   * @param req - order id in params
   * @param res - return the order by id
   */
  private getOrderById = async (req, res) => {
    try {
      const order = await this.orderService.getOrderById(req.params.id);
      res.status(StatusCodes.OK).json(order);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  };

  /**
   * Create order
   * @param req - order data in body
   * @param res - return the created order
   */
  private createOrder = async (req, res) => {
    try {
      const order = await this.orderService.createOrder(req.body);
      res.status(StatusCodes.CREATED).json(order);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  };

  /**
   * Update order
   * @param req - order id in params, order data in body
   * @param res - return the updated order
   */
  private updateOrder = async (req, res) => {
    try {
      const order = await this.orderService.updateOrder(
        req.params.id,
        req.body
      );
      res.status(StatusCodes.OK).json(order);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  };

  /**
   * Delete order
   * @param req - order id in params
   * @param res - no return value
   */
  private deleteOrder = async (req, res) => {
    try {
      const order = await this.orderService.deleteOrder(req.params.id);
      res.status(StatusCodes.OK).json(order);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  };
}
