import * as express from 'express';
import { inject, injectable } from 'inversify';
import HttpStatus from 'http-status-codes';
import { OrderManagementRepository } from '../../../repositories/OrderManagementRepository';
import { INVERSIFY_TYPES } from '../../../Inversify/InversifyTypes';
import { AuthMiddleware } from '../../middlewares/AuthMiddleware';
import { IRouterController } from '../IRouterController';
import { RequestOrderMiddleware } from './RequestOrderMiddleware';
import { UpdateOrderMiddleware } from './UpdateOrderMiddleware';

@injectable()
export class OrderManagementController implements IRouterController {
  public readonly router: express.Router;

  private path = '/order';

  constructor(
    @inject(INVERSIFY_TYPES.AuthMiddleware)
    private authMiddleware: AuthMiddleware,
    @inject(INVERSIFY_TYPES.OrderManagementRepository)
    private orderManagementRepository: OrderManagementRepository,
    @inject(INVERSIFY_TYPES.RequestOrderMiddleware)
    private requestOrderMiddleware: RequestOrderMiddleware,
    @inject(INVERSIFY_TYPES.UpdateOrderMiddleware)
    private updateOrderMiddleware: UpdateOrderMiddleware
  ) {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/:orderId`,
      this.authMiddleware.handler(),
      this.get
    );

    this.router.get(
      `${this.path}`,
      this.authMiddleware.handler(),
      this.getOrders
    );

    this.router.post(
      `${this.path}`,
      this.authMiddleware.handler(),
      this.requestOrderMiddleware.handler(),
      this.post
    );

    this.router.put(
      `${this.path}`,
      this.authMiddleware.handler(),
      this.updateOrderMiddleware.handler(),
      this.put
    );

    this.router.delete(
      `${this.path}/:orderId`,
      this.authMiddleware.handler(),
      this.delete
    );
  }

  private get = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      const { orderId } = request.params;
      const order = await this.orderManagementRepository.getOrderDetails(orderId);
      response.status(HttpStatus.OK).json(order);
    } catch (error) {
      next(error);
    }
  };

  private getOrders = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {

      const { page, limit } = request.query;
      const orders = await this.orderManagementRepository.getOrders(Number(page), Number(limit));
      response.status(HttpStatus.OK).json(orders);
    } catch (error) {
      next(error);
    }
  };

  private post = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      const { body } = request;
      await this.orderManagementRepository.save(body);
      response.status(HttpStatus.CREATED).json({});
    } catch (error) {
      next(error);
    }
  };

  private put = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      const { body } = request;
      await this.orderManagementRepository.updateOrder(body);
      response.status(HttpStatus.NO_CONTENT).json({});
    } catch (error) {
      next(error);
    }
  };

  private delete = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    try {
      const { orderId } = request.params;
      await this.orderManagementRepository.deleteOrder(orderId);
      response.status(HttpStatus.NO_CONTENT).json({});
    } catch (error) {
      next(error);
    }
  };
}
