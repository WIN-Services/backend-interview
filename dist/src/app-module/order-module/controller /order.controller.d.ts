import { Utility } from "src/utils/utility";
import { Logger } from "winston";
import { OrderService } from "../services/order.service";
export declare class OrderController {
    private readonly logger;
    private orderService;
    private utilityService;
    constructor(logger: Logger, orderService: OrderService, utilityService: Utility);
    saveOrder(body: any): Promise<any>;
    getAllOrders(queryParam: any): Promise<any>;
    getOrderByUserId(userId: string, queryParam: any): Promise<any>;
    updateOrder(body: any, orderId: string): Promise<any>;
    deleteOrder(orderId: string): Promise<any>;
}
