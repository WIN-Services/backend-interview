import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateServiceDto} from '../dto/create-service.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {ServiceEntity} from "../entities/service.entity";
import {Repository} from "typeorm";

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(ServiceEntity)
        private readonly serviceRepository: Repository<ServiceEntity>) {
    }

    public async addService(body: CreateServiceDto): Promise<any> {
        const existingService = await this.serviceRepository.findOne({
            where: {name: body.name},
        });
        if (existingService) {
            throw new ConflictException('Service name already present');
        }
        return await this.serviceRepository.save(body);
    }

    public async getAllServices(): Promise<any> {
        return await this.serviceRepository.find();
    }

    public async getServiceById(id): Promise<any> {
        return await this.serviceRepository.findOne({where: {id: id}});
    }

    public async updateServiceById(id, service) {
        const existingService = await this.serviceRepository.findOne({
            where: {id: id},
        });

        if (!existingService) {
            throw new NotFoundException('Service does not exist');
        }
        const {name} = service;
        const checkServiceWithName = await this.serviceRepository.findOne({
            where: {name: name},
        });
        if (checkServiceWithName) {
            throw new ConflictException('Service Name should be unique');
        }
        return await this.serviceRepository.update(id, service);
    }

    public async deleteServiceById(id): Promise<any> {
        return await this.serviceRepository.delete({id});
    }
}
