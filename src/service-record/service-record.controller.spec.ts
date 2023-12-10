import { Test, TestingModule } from '@nestjs/testing';
import { ServiceRecordController } from './service-record.controller';
import { ServiceRecordService } from './service-record.service';
import { CreateServiceRecordDto } from './dto/create-service-record.dto';
import { UpdateServiceRecordDto } from './dto/update-service-record.dto';

describe('ServiceRecordController', () => {
  let controller: ServiceRecordController;
  let service: ServiceRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceRecordController],
      providers: [
        {
          provide: ServiceRecordService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ServiceRecordController>(ServiceRecordController);
    service = module.get<ServiceRecordService>(ServiceRecordService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with CreateServiceRecordDto', async () => {
      const dto = new CreateServiceRecordDto();
      await controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call service.findOne with id', async () => {
      const id = '1';
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should call service.update with id and UpdateServiceRecordDto', async () => {
      const id = '1';
      const dto = new UpdateServiceRecordDto();
      await controller.update(id, dto);
      expect(service.update).toHaveBeenCalledWith(+id, dto);
    });
  });

  describe('remove', () => {
    it('should call service.remove with id', async () => {
      const id = '1';
      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
  });
});
