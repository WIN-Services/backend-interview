import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from } from 'rxjs';
import { Repository } from 'typeorm';
import { ServiceEntity } from '../models/service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
  ) {}

  public async getAllServices(): Promise<any> {
    return await from(this.serviceRepository.find());
  }

  public async addService(body): Promise<any> {
    const existingService = await this.serviceRepository.findOne({
      where: { name: body.name },
    });
    if (existingService) {
      throw new ConflictException('Service name already present');
    }
    return await from(this.serviceRepository.save(body));
  }

  public async updateService(id, service): Promise<any> {
    const existingService = await this.serviceRepository.findOne({
      where: { id: id },
    });
    console.log('ServiceService ~ addService ~ Service', existingService);

    if (!existingService) {
      throw new NotFoundException('Service does not exist');
    }
    const { name } = service;
    const checkServiceWithName = await this.serviceRepository.findOne({
      where: { name: name },
    });
    if (checkServiceWithName) {
      throw new ConflictException('Service Name should be unique');
    }
    return await from(this.serviceRepository.update(id, service));
  }

  public async deleteService(id): Promise<any> {
    return await from(this.serviceRepository.delete({ id }));
  }

  public async getServiceById(id): Promise<any> {
    return await from(this.serviceRepository.findOne({ where: { id } }));
  }
}
