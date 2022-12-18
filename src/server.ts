import * as path from 'path';
import * as dotenv from "dotenv";
import App from './app';
import ServicesController from './controllers/services.controller';
import OrdersController from './controllers/orders.controller';
import { sequelize } from './database/sequelize';
import { Service, Order, ServiceOrder } from './models';

if (process.env.NODE_ENV !== 'prod') {
  console.log({ path: path.resolve(__dirname, '../.env') })
  dotenv.config({ path: path.resolve(__dirname, '../.env') });
}
const serviceRepository = sequelize.getRepository(Service);
const orderRepository = sequelize.getRepository(Order);
const serviceOrderRepository = sequelize.getRepository(ServiceOrder);

const port = process.env.PORT || 3000;

(async () => {
  await sequelize.sync({ alter: true });
  const app = new App(
    [
      new ServicesController(serviceRepository, orderRepository),
      new OrdersController(serviceRepository, orderRepository, serviceOrderRepository),
    ],
    +port,
  );
  app.listen();
})();








