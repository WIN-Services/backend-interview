import { Logger } from "@nestjs/common";
import { OrderEntity } from "../entities/order.entity";
import { OrderRepository } from "../repository/order.repository";
export declare class OrderService {
    private readonly logger;
    private orderRepository;
    constructor(logger: Logger, orderRepository: OrderRepository);
    save(body: any): Promise<OrderEntity | any>;
    findByPagnation(skip: number, limit: number, page: number, userId: string): Promise<{
        docs: any;
        nextPage: number;
    }>;
    deleteByOrderId(orderId: string): Promise<any>;
    updateByOrderId(body: any, orderId: string): Promise<any>;
    private orderResponse;
}
