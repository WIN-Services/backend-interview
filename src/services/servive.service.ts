import { getRepository, OrderByCondition } from "typeorm";
import { Service } from "../models/services.model";

class Services {
    // private serviceRepository = getRepository(Service);

    async createService(data: Partial<Service>): Promise<Service> {
        const serviceRepository = getRepository(Service);
        const service = serviceRepository.create(data);
        return serviceRepository.save(service);
    }

    async fetchService(serviceId: number): Promise<Service | undefined> {
        const serviceRepository = getRepository(Service);
        return serviceRepository.findOne(serviceId, { relations: ["orders"]});
    }

    async fetchAllServices(filter: any = {}, skip: number = 0, limit: number = 0): Promise<Service[]> {
        const serviceRepository = getRepository(Service);
        const orderBy: OrderByCondition = {
            createdAt: "DESC",
        };
        return serviceRepository.find({
            relations: ["orders"],
            where: filter,
            order: orderBy,
            skip,
            take: limit,
        });
    }

    async destroyService(serviceId: number): Promise<Service | undefined> {
        const serviceRepository = getRepository(Service);
        const service = await serviceRepository.findOne(serviceId);
        if (service) {
            await serviceRepository.remove(service);
        }
        return service;
    }

    async updateService(serviceId: number, data: Partial<Service>): Promise<Service | undefined> {
        const serviceRepository = getRepository(Service);
        const service = await serviceRepository.findOne(serviceId);
        if (service) {
            Object.assign(service, data);
            await serviceRepository.save(service);
        }
        return service;
    }
}

export default Services;

