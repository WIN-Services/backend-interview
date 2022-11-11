import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SERVICES } from '../enums/enums';
import { Repository } from 'typeorm';
import { Services } from '../ententies/services.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Services)
    private servicesRepository: Repository<Services>,
  ) { }

  async createService(service: Services): Promise<Services> {
    const savedService = await this.servicesRepository.save(service)
    return savedService;
  }

  async updateService(service: Partial<Services>): Promise<string> {
    await this.servicesRepository.update({ id: service.id }, service);
    return SERVICES.Update;
  }

  async findAllServices(): Promise<Services[]> {
    return this.servicesRepository.find();
  }

  async findOneService(id: number): Promise<Services> {
    const service = await this.servicesRepository.findOneBy({ id });
    if(service) return service;
    else throw new HttpException(SERVICES.NotFount, HttpStatus.NOT_FOUND);
  }

  async removeService(id: number): Promise<string> {
    await this.servicesRepository.delete(id);
    return SERVICES.Remove;
  }
}
