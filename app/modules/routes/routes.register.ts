import { Application, json, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ResponseHandler } from '../../utility/response-handler';
import { routes } from './routes.data';

export const registerRoutes = (app: Application) => {
  app.use(cors());
  app.use(json());

  for (let route of routes) {
    app.use(route.path, route.router);
  }

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode || 500).send(new ResponseHandler(null, err));
  });
};
