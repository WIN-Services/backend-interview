import { Container } from "inversify";
import { OrderController } from "../controllers/order.controller";
import { IOrderRepository, OrderRepository } from "./respositories/order.repository";
import { IOrderService, OrderService } from "./services/order.service";
import { IServiceRepository, ServiceRepository } from "./respositories/service.repository";
import { OrderValidator } from "./validators/order.validator";
import TYPES from "./type";
import { IOrderServiceRepository, OrderServiceRepository } from "./respositories/order.service.repository";



const container = new Container();

container.bind<OrderController>(TYPES.OrderController).to(OrderController);
container.bind<OrderValidator>(TYPES.OrderValidator).to(OrderValidator);
container.bind<IOrderRepository>(TYPES.OrderRepository).to(OrderRepository);
container.bind<IOrderService>(TYPES.OrderService).to(OrderService);
container.bind<IServiceRepository>(TYPES.ServiceRepository).to(ServiceRepository);
container.bind<IOrderServiceRepository>(TYPES.OrderServiceRepository).to(OrderServiceRepository);

export default container;