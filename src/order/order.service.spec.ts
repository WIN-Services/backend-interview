import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

describe('OrderService', () => {
  let service: OrderService;
  let repository: Repository<Order>;

  const mockOrderRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    softRemove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockOrderRepository,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    repository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create an order', async () => {
      const orderData = { dateTime: new Date(), totalFee: 100, services: [] };
      mockOrderRepository.create.mockReturnValue(orderData);
      mockOrderRepository.save.mockResolvedValue(orderData);

      const result = await service.create(orderData);
      expect(result).toEqual(orderData);
      expect(mockOrderRepository.create).toHaveBeenCalledWith(orderData);
      expect(mockOrderRepository.save).toHaveBeenCalledWith(orderData);
    });
  });

  describe('findOne', () => {
    it('should return an order if it exists', async () => {
      const order = {
        id: 1,
        dateTime: new Date(),
        totalFee: 100,
        services: [],
      };
      mockOrderRepository.findOne.mockResolvedValue(order);

      const result = await service.findOne(1);
      expect(result).toEqual(order);
      expect(mockOrderRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['services'],
      });
    });

    it('should throw an error if no order is found', async () => {
      mockOrderRepository.findOne.mockResolvedValue(undefined);

      await expect(service.findOne(1)).rejects.toThrow();
    });
  });
});
