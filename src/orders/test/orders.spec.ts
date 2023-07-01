import { Test } from '@nestjs/testing';
import { CreateOrderDto } from '../dto/create-order.dto';
import { OrdersController } from '../orders.controller';
import { OrdersService } from '../orders.service';
import { Order } from '../entities/order.entity';

const orderStub: Order = {
  total_amount: 10,
  services: [
    {
      id: 'e225266d-9748-439d-8e2d-5be5f313cb44',
      amount: 10,
    },
  ],
  user_id: 'e225266d-9748-439d-8e2d-5be5f313cb44',
  is_deleted: false,
  _id: 'd2b00c91-daad-4d2e-aacc-f0bfa1de110a',
  created_at: new Date(),
  updated_at: new Date(),
};

const createOrderStub: Order = {
  total_amount: 10,
  services: [
    {
      id: 'e225266d-9748-439d-8e2d-5be5f313cb44',
      amount: 10,
    },
  ],
  user_id: 'e225266d-9748-439d-8e2d-5be5f313cb44',
  is_deleted: false,
  _id: 'd2b00c91-daad-4d2e-aacc-f0bfa1de110a',
  created_at: new Date(),
  updated_at: new Date(),
};

const updateOrderStub: Order = {
  total_amount: 10,
  services: [
    {
      id: 'e225266d-9748-439d-8e2d-5be5f313cb44',
      amount: 100,
    },
  ],
  user_id: 'e225266d-9748-439d-8e2d-5be5f313cb44',
  is_deleted: false,
  _id: 'd2b00c91-daad-4d2e-aacc-f0bfa1de110a',
  created_at: new Date(),
  updated_at: new Date(),
};

const createOrderRequest = {
  services: [
    {
      id: '7a7258e3-5de8-4910-a75d-ebef93217e87',
      amount: 10,
    },
  ],
  user_id: '7a7258e3-5de8-4910-a75d-ebef93217e87',
};

const udpateOrderRequest = {
  services: [
    {
      id: '7a7258e3-5de8-4910-a75d-ebef93217e87',
      amount: 100,
    },
  ],
  order_id: '7a7258e3-5de8-4910-a75d-ebef93217e87',
};

describe('OrderModule', () => {
  let orderController: OrdersController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
        {
          provide: OrdersService,
          useValue: {
            create: jest.fn().mockReturnValue(createOrderStub),
            update: jest.fn().mockReturnValue(updateOrderStub),
            findOne: jest.fn().mockReturnValue(orderStub),
          },
        },
      ],
    }).compile();

    orderService = moduleRef.get<OrdersService>(OrdersService);
    orderController = moduleRef.get<OrdersController>(OrdersController);
  });

  describe('Orders', () => {
    it('Create an order', () => {
      expect(orderController.create(createOrderRequest)).resolves.toEqual(
        createOrderStub,
      );
    });
    it('Update an order', () => {
      expect(orderController.update(udpateOrderRequest)).resolves.toEqual(
        updateOrderStub,
      );
    });
    it('Create an order', () => {
      expect(
        orderController.findOne('e225266d-9748-439d-8e2d-5be5f313cb44'),
      ).resolves.toEqual(orderStub);
    });
  });
});
