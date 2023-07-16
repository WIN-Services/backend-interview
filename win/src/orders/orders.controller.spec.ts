import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Service } from '../services/entities/service.entity';
import { Order } from './entities/order.entity';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  const mockedOrderRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((order) => ({
      id: uuidv4(),
      ...order,
    })),
    find: jest.fn().mockImplementation(() => []),
    findOne: jest.fn().mockImplementation((id) => ({
      id,
      datetime: new Date(),
      totalfee: 100,
      services: [],
    })),
  };

  const mockedServiceRepository = {
    findBy: jest.fn().mockImplementation((dto) => [dto]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
        {
          provide: getRepositoryToken(Order),
          useValue: mockedOrderRepository,
        },
        {
          provide: getRepositoryToken(Service),
          useValue: mockedServiceRepository,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an order', async () => {
    const order = {
      datetime: new Date(),
      totalfee: 100,
      services: [],
    };
    jest.spyOn(service, 'create').mockImplementation(() =>
      Promise.resolve({
        ...order,
        id: uuidv4(),
      }),
    );
    expect(await controller.create(order)).toEqual({
      id: expect.any(String),
      ...order,
    });
  });

  it('should get all orders', async () => {
    const order = {
      datetime: new Date(),
      totalfee: 100,
      services: [],
    };
    jest.spyOn(service, 'findAll').mockImplementation(() =>
      Promise.resolve([
        {
          ...order,
          id: uuidv4(),
        },
      ]),
    );
    expect(await controller.findAll()).toEqual([
      {
        id: expect.any(String),
        ...order,
      },
    ]);
  });

  it('should get an order', async () => {
    const order = {
      datetime: new Date(),
      totalfee: 100,
      services: [],
    };
    const orderId = uuidv4();
    jest.spyOn(service, 'findOne').mockImplementation(() =>
      Promise.resolve({
        ...order,
        id: orderId,
      }),
    );
    expect(await controller.findOne(orderId)).toEqual({
      id: orderId,
      ...order,
    });
  });

  it('should update an order', async () => {
    const order = {
      id: uuidv4(),
      datetime: new Date(),
      totalfee: 100,
      services: [],
    };
    const updatedOrder = {
      totalfee: 200,
    };
    jest.spyOn(service, 'update').mockImplementation(() =>
      Promise.resolve({
        ...order,
        ...updatedOrder,
      }),
    );

    expect(await controller.update(order.id, updatedOrder)).toEqual({
      ...order,
      ...updatedOrder,
    });
  });
});
