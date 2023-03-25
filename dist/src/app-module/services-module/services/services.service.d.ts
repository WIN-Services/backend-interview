import { Logger } from "@nestjs/common";
import { ServicesEntity } from "../entities/services.entity";
import { ServicesRepository } from "../repository/services.repository";
export declare class ServicesService {
    private readonly logger;
    private servicesRepository;
    constructor(logger: Logger, servicesRepository: ServicesRepository);
    save(body: any): Promise<ServicesEntity | any>;
    findByPagnation(skip: number, limit: number, page: number): Promise<{
        docs: any;
        nextPage: number;
    }>;
    deleteByServiceId(serviceId: string): Promise<any>;
    updateByServiceId(body: any, serviceId: string): Promise<any>;
    private servicesResponse;
}
