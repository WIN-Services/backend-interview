import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceRecord } from './entities/service-record.entity';
import { CreateServiceRecordDto } from './dto/create-service-record.dto';
import { UpdateServiceRecordDto } from './dto/update-service-record.dto';

@Injectable()
export class ServiceRecordService {
  constructor(
    @InjectRepository(ServiceRecord)
    private serviceRecordRepository: Repository<ServiceRecord>,
  ) {}

  async create(
    createServiceRecordDto: CreateServiceRecordDto,
  ): Promise<ServiceRecord> {
    const serviceRecord = this.serviceRecordRepository.create(
      createServiceRecordDto,
    );
    return this.serviceRecordRepository.save(serviceRecord);
  }

  async findAll(): Promise<ServiceRecord[]> {
    return this.serviceRecordRepository.find();
  }

  async findOne(id: number): Promise<ServiceRecord> {
    const serviceRecord = await this.serviceRecordRepository.findOne({
      where: { id: id },
    });
    if (!serviceRecord) {
      throw new NotFoundException(`ServiceRecord with ID ${id} not found`);
    }
    return serviceRecord;
  }

  async update(
    id: number,
    updateServiceRecordDto: UpdateServiceRecordDto,
  ): Promise<ServiceRecord> {
    const serviceRecord = await this.findOne(id);
    this.serviceRecordRepository.merge(serviceRecord, updateServiceRecordDto);
    return this.serviceRecordRepository.save(serviceRecord);
  }

  async remove(id: number): Promise<void> {
    await this.serviceRecordRepository.delete(id);
  }
}
