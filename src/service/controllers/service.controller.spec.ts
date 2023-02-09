import { Test, TestingModule } from '@nestjs/testing';
import { ServiceController } from './service.controller';
import { ServiceService } from '../services/service.service';

describe('ServiceController', () => {
  let serviceController: ServiceController;
  const mockServiceData = [
    {
      id: 3,
      name: 'service4',
      createdAt: '2023-02-08T15:08:54.254Z',
      updatedAt: '2023-02-08T15:08:54.254Z',
    },
    {
      id: 4,
      name: 'service2',
      createdAt: '2023-02-09T07:43:59.636Z',
      updatedAt: '2023-02-09T07:43:59.636Z',
    },
    {
      id: 5,
      name: 'service2',
      createdAt: '2023-02-09T07:44:03.741Z',
      updatedAt: '2023-02-09T07:44:03.741Z',
    },
    {
      id: 6,
      name: 'service3',
      createdAt: '2023-02-09T07:44:15.799Z',
      updatedAt: '2023-02-09T07:44:15.799Z',
    },
    {
      id: 7,
      name: 'service31',
      createdAt: '2023-02-09T07:51:23.251Z',
      updatedAt: '2023-02-09T07:51:23.251Z',
    },
  ];
  const mockService = {
    addService: jest.fn((dto) => {
      for (let i = 0; i < mockServiceData.length; i++) {
        if (mockServiceData[i].name == dto.name) {
          return 'service name already present';
        }
      }
      return dto;
    }),
    updateService: jest.fn((param, dto) => {
      for (let i = 0; i < mockServiceData.length; i++) {
        if (mockServiceData[i].id == param) {
          return 'service updated successfully';
        }
      }
      return 'service not found';
    }),
    getServiceById: jest.fn((param) => {
      for (let i = 0; i < mockServiceData.length; i++) {
        if (mockServiceData[i].id == param) {
          return mockServiceData[i];
        }
      }
      return 'service not found';
    }),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceController],
      providers: [ServiceService],
    })
      .overrideProvider(ServiceService)
      .useValue(mockService)
      .compile();

    serviceController = app.get<ServiceController>(ServiceController);
  });

  describe('root', () => {
    it('should create a service', async () => {
      const mockServiceData = {
        name: 'service101',
      };
      console.log(
        ' order.controller.spec.ts:37 ~ it ~ mockServiceData',
        mockServiceData,
      );
      const res = await serviceController.addService(mockServiceData);
      console.log(':20 ~ it ~ res', res);
      expect(res).toBe(mockServiceData);
    });
    it('should not create a service', async () => {
      const mockServiceData = {
        name: 'service2',
      };
      console.log(
        ' order.controller.spec.ts:37 ~ it ~ mockServiceData',
        mockServiceData,
      );
      const res = await serviceController.addService(mockServiceData);
      console.log(':20 ~ it ~ res', res);
      expect(res).toBe('service name already present');
    });

    it('should not update a Service', async () => {
      const mockServiceData = {
        name: 'service51',
      };
      console.log(
        ' Service.controller.spec.ts:37 ~ it ~ mockServiceData',
        mockServiceData,
      );
      const param = { id: 10 };
      const res = await serviceController.updateService(mockServiceData, param);
      expect(res).toBe('service not found');
    });

    it('should update a Service', async () => {
      const mockServiceData = {
        name: 'service2',
      };
      console.log(
        ' Service.controller.spec.ts:37 ~ it ~ mockServiceData',
        mockServiceData,
      );
      const param = { id: 3 };
      const res = await serviceController.updateService(mockServiceData, param);
      expect(res).toBe('service updated successfully');
    });

    it('should return return Service', async () => {
      const param = { id: 4 };
      const res = await serviceController.getServiceById(param);
      expect(res.id).toBe(4);
    });
  });
});
