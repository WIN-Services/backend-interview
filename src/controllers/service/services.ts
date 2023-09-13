import express, { Request, Response, NextFunction } from 'express';
import DatabaseService from '../../services/database';
import { serviceIdParams } from '../../schema';

const service = express.Router();

const serviceIdParamsValidation = (req: Request, res: Response, next: NextFunction) => {
  const result = serviceIdParams.validate(req.params);
  if (result.error) {
    return res.status(400).send(result.error.message);
  }
  next();
};

service.get('/', async (req: Request, res: Response) => {
  const ds = new DatabaseService();
  const services = await ds.getAllServices();

  if (services) {
    return res.status(200).send(services);
  }

  return res.status(404).send('Not Found');
});

service.get('/:service_id', serviceIdParamsValidation, async (req: Request, res: Response) => {
  const ds = new DatabaseService();

  const service = await ds.getServiceById(Number(req.params['service_id']));

  if (service) {
    return res.status(200).send(service);
  }

  return res.status(404).send('Not Found');
});

export default service;
