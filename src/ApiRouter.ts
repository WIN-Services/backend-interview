import * as express from 'express';
import { OrderController } from './controllers';

export class ApiRouter {
  public static Register(app: express.Express) {
    app.use(OrderController.route, new OrderController().router);
  }
}
