import { Router, Request, Response, NextFunction } from 'express';
import { ResponseHandler } from '../../utility/response-handler';
import orderService from './order.service';
import { createOrderValidator, updateOrderValidator } from './order.validators';

export const OrderRouter = Router();

OrderRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await orderService.getAllOrder();
      res.status(200).send(new ResponseHandler(result));
    } catch (e) {
      next(e);
    }
  },
);

OrderRouter.get(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await orderService.getOrder(req.params.id);
      res.status(200).send(new ResponseHandler(result));
    } catch (e) {
      next(e);
    }
  },
);

OrderRouter.post(
  '/',
  createOrderValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await orderService.createOrder(req.body);
      res.status(201).send(new ResponseHandler(result));
    } catch (e) {
      next(e);
    }
  },
);

OrderRouter.put(
  '/',
  updateOrderValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await orderService.updateOrder(req.body);
      res.status(200).send(new ResponseHandler(result));
    } catch (e) {
      next(e);
    }
  },
);

OrderRouter.delete(
  '/:id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await orderService.deleteOrder(req.params.id as string);
      res.status(200).send(new ResponseHandler(result));
    } catch (e) {
      next(e);
    }
  },
);
