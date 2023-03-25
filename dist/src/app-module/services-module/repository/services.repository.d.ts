import { Model } from "mongoose";
import { ServicesEntity } from "../entities/services.entity";
import { ServicesInterface } from "../interface/services.interface";
export declare class ServicesRepository {
    private servicesModel;
    constructor(servicesModel: Model<ServicesInterface>);
    saveService(body: ServicesEntity): Promise<ServicesInterface>;
    findByPagination(skip: number, limit: number): Promise<any>;
    updateService(body: Partial<ServicesEntity>, orderId: string): Promise<any>;
    deleteService(serviceId: string): Promise<any>;
}
