import express = require('express');
const router = express.Router();
import { OrderService } from '../services/orders';

/**
 *
 *
 * Returns the all orders
 */
 router.get('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
      const orderService = new OrderService(req);
      const apiResponse = await orderService.getOrders();
      res.status(apiResponse.status).send(apiResponse.data);
  } catch (err) {
      return next(err);
  }
});
/**
 *
 *
 * Creates a new order entry and return it with an id
 */
router.post('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const orderService = new OrderService(req);
        const apiResponse = await orderService.createOrder(req.body);
        res.status(apiResponse.status).send(apiResponse.data);
    } catch (err) {
        return next(err);
    }
});

/**
 *
 *
 * Updates an exisitng order using provided order object
 */
router.put('/', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const orderService = new OrderService(req);
        const apiResponse = await orderService.updateOrder(req.body);
        res.status(apiResponse.status).send(apiResponse.data);
    } catch (err) {
        return next(err);
    }
});

/**
 *
 *
 * Returns the order object related to the given orderId
 */
router.get('/:orderId', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const orderService = new OrderService(req);
        const apiResponse = await orderService.getOrder(req.params.orderId);
        res.status(apiResponse.status).send(apiResponse.data);
    } catch (err) {
        return next(err);
    }
});

/**
 *
 *
 * Deletes the order object related to the given orderId
 */
router.delete('/:orderId', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const orderService = new OrderService(req);
        const apiResponse = await orderService.deleteOrder(req.params.orderId);
        res.status(apiResponse.status).send(apiResponse.data);
    } catch (err) {
        return next(err);
    }
});

export const ordersRouter = router;
