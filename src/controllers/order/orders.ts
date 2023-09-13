import express, { Request, Response, NextFunction } from 'express';
import DatabaseService from '../../services/database';
import { createOrderSchema, orderIdParams } from '../../schema';

const order = express.Router();

const createOrderValidation = (req: Request, res: Response, next: NextFunction) => {
  const result = createOrderSchema.validate(req.body);
  if (result.error) {
    return res.status(400).send(result.error.message);
  }
  next();
};

const orderIdParamsValidation = (req: Request, res: Response, next: NextFunction) => {
  const result = orderIdParams.validate(req.params);
  if (result.error) {
    return res.status(400).send(result.error.message);
  }
  next();
};

const orderServiceHelper = async (
  serviceIds: number[],
  ds: DatabaseService,
): Promise<{ id: number[] | null; totalFee: number }> => {
  let totalFee = 0;
  const services = await ds.getServicesByIds(serviceIds);
  if (!services) {
    return { id: serviceIds, totalFee };
  }
  const serviceMap: Map<number, boolean> = new Map();

  for (const service of services) {
    totalFee += service.fee;
    serviceMap.set(service.id, true);
  }

  for (const id of serviceIds) {
    if (!serviceMap.has(id)) {
      return { id: [id], totalFee };
    }
  }

  return { id: null, totalFee };
};

order.get('/', async (req: Request, res: Response) => {
  try {
    console.log('yes');
    const ds = new DatabaseService();
    const orders = await ds.getAllOrders();

    if (orders) {
      return res.status(200).send(orders);
    }

    return res.status(404).send('Not Found');
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

order.get('/:order_id', orderIdParamsValidation, async (req: Request, res: Response) => {
  try {
    const ds = new DatabaseService();

    const orders = await ds.getOrderById(Number(req.params['order_id']));

    if (orders) {
      return res.status(200).send(orders);
    }

    return res.status(404).send('Not Found');
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

order.post('/', createOrderValidation, async (req: Request, res: Response) => {
  try {
    const ds = new DatabaseService();
    const serviceIds = req.body['service_ids'].map((id: number) => Number(id));

    const services = await orderServiceHelper(serviceIds, ds);

    if (services.id?.length) {
      return res.status(400).send(`Service Id not found ${services.id.join(',')}`);
    }

    const orderId = await ds.createOrder(serviceIds, services.totalFee);

    return res.status(201).send({ orderId });
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

order.put('/:order_id', orderIdParamsValidation, createOrderValidation, async (req: Request, res: Response) => {
  try {
    const ds = new DatabaseService();
    const orderId = Number(req.params['order_id']);
    const serviceIds = req.body['service_ids'].map((id: number) => Number(id));
    const orderExist = await ds.getOrderById(orderId);
    if (!orderExist) {
      return res.status(400).send(`Order Id ${orderId} does not exist`);
    }

    const orderTime = new Date(orderExist.datetime).getTime();
    const currentTime = new Date().getTime();

    console.log(orderTime, currentTime);

    if (currentTime - orderTime < 3 * 60 * 60 * 1000) {
      return res.status(400).send('Can not update order before 3 hours');
    }

    const services = await orderServiceHelper(serviceIds, ds);

    if (services.id?.length) {
      return res.status(400).send(`Service Id not found ${services.id.join(',')}`);
    }
    await ds.editOrder(orderId, serviceIds, services.totalFee);

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

order.delete('/:order_id', orderIdParamsValidation, async (req: Request, res: Response) => {
  try {
    const ds = new DatabaseService();

    await ds.deleteOrder(Number(req.params['order_id']));

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

export default order;
