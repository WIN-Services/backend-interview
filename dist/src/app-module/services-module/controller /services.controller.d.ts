import { Utility } from "src/utils/utility";
import { Logger } from "winston";
import { ServicesService } from "../services/services.service";
export declare class ServicesController {
    private readonly logger;
    private services;
    private utilityService;
    constructor(logger: Logger, services: ServicesService, utilityService: Utility);
    saveServices(body: any): Promise<any>;
    getAllServices(queryParam: any): Promise<any>;
    updateOrderService(body: any, serviceId: string): Promise<any>;
    deleteOrderService(serviceId: string): Promise<any>;
}
