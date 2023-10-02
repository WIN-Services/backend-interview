// order.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderValidator } from './create-order.validator';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    }).compile();

    orderController = module.get<OrderController>(OrderController);
    orderService = module.get<OrderService>(OrderService);
  });

  describe('createOrder', () => {
    it('should create an order', async () => {
      const createOrderDto = {
        datetime: '2022-11-01T11:11:11.111Z',
        totalFee: 100,
        services: ['123'],
      };

      const result = {
        id: '223',
        datetime: '2022-11-01T11:11:11.111Z',
        totalFee: 100,
        services: [
          {
            id: '123',
          },
        ],
      };

      jest.spyOn(orderService, 'createOrder').mockResolvedValue(result);

      const createdOrder = await orderController.createOrder(createOrderDto);
      expect(createdOrder).toEqual(result);
    });

    // Add more test cases for validation, edge cases, etc.
  });
});
