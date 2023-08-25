import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DatabaseService } from '../../database/database.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
        {
          provide: DatabaseService,
          useValue: {
            executeQuery: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createOrder', () => {
    it('should create an order', async () => {
      const createOrderDto: CreateOrderDto = {
        dateTime: String(new Date()),
        totalFee: 100.00,
        serviceId: [1],
      };
      const expectedResult = { win_insert_order: 1 }; // Update with expected result

      jest
        .spyOn(ordersService, 'createOrder')
        .mockResolvedValue(expectedResult);

      const result = await controller.createOrder(createOrderDto);

      expect(result).toEqual(expectedResult);
    });
  });
});
