import { Test, TestingModule } from '@nestjs/testing';
import { ServiceRecordService } from './service-record.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ServiceRecord } from './entities/service-record.entity';
import { Repository } from 'typeorm';

describe('ServiceRecordService', () => {
  let service: ServiceRecordService;
  let repository: Repository<ServiceRecord>;

  const mockServiceRecordRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceRecordService,
        {
          provide: getRepositoryToken(ServiceRecord),
          useValue: mockServiceRecordRepository,
        },
      ],
    }).compile();

    service = module.get<ServiceRecordService>(ServiceRecordService);
    repository = module.get<Repository<ServiceRecord>>(
      getRepositoryToken(ServiceRecord),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a service record', async () => {
      const serviceRecordData = { name: 'Testing Service' };
      mockServiceRecordRepository.create.mockReturnValue(serviceRecordData);
      mockServiceRecordRepository.save.mockResolvedValue(serviceRecordData);

      const result = await service.create(serviceRecordData);
      expect(result).toEqual(serviceRecordData);
      expect(mockServiceRecordRepository.create).toHaveBeenCalledWith(
        serviceRecordData,
      );
      expect(mockServiceRecordRepository.save).toHaveBeenCalledWith(
        serviceRecordData,
      );
    });
  });

  describe('findOne', () => {
    it('should return a service record if it exists', async () => {
      const serviceRecord = { id: 1, name: 'Testing Service' };
      mockServiceRecordRepository.findOne.mockResolvedValue(serviceRecord);

      const result = await service.findOne(1);
      expect(result).toEqual(serviceRecord);
      expect(mockServiceRecordRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw an error if no service record is found', async () => {
      mockServiceRecordRepository.findOne.mockResolvedValue(undefined);

      await expect(service.findOne(1)).rejects.toThrow();
    });
  });
});
