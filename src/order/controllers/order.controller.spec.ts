import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from '../services/order.service';

describe('OrderController', () => {
  let orderController: OrderController;
  const mockOrderData = [
    {
      id: 3,
      dateTime: '2022-11-01T11:11:11.111Z',
      totalFee: 400,
      serviceId: 1,
      isArchived: false,
      createdAt: '2023-02-08T11:57:20.184Z',
      updatedAt: '2023-02-08T11:57:20.184Z',
    },
    {
      id: 4,
      dateTime: '2022-11-01T11:11:11.111Z',
      totalFee: 400,
      serviceId: 1,
      isArchived: false,
      createdAt: '2023-02-08T12:22:18.114Z',
      updatedAt: '2023-02-08T12:29:28.687Z',
    },
    {
      id: 5,
      dateTime: '2022-11-01T11:11:11.111Z',
      totalFee: 400,
      serviceId: 1,
      isArchived: false,
      createdAt: '2023-02-08T12:33:24.846Z',
      updatedAt: '2023-02-08T12:33:24.846Z',
    },
    {
      id: 1,
      dateTime: '2022-11-01T11:11:11.111Z',
      totalFee: 400,
      serviceId: 1,
      isArchived: false,
      createdAt: '2023-02-08T11:55:23.664Z',
      updatedAt: '2023-02-09T13:07:07.258Z',
    },
    {
      id: 2,
      dateTime: '2022-11-01T11:11:11.111Z',
      totalFee: 400,
      serviceId: 4,
      isArchived: false,
      createdAt: '2023-02-08T11:55:34.363Z',
      updatedAt: '2022-02-08T13:14:01.261Z',
    },
  ];
  const mockOrdersService = {
    addOrder: jest.fn((dto) => {
      return dto;
    }),
    updateOrder: jest.fn((param, dto) => {
      for (let i = 0; i < mockOrderData.length; i++) {
        if (mockOrderData[i].id == param) {
          const currentTime = new Date().getTime();
          const threeHourEarlierTime = currentTime - 3 * 60 * 60 * 1000;
          const updatedTime = new Date(mockOrderData[i].updatedAt).getTime();
          const updatedTimeToIst = updatedTime + 5.5 * 60 * 60 * 1000;
          if (updatedTimeToIst > threeHourEarlierTime) {
            return 'Cannot update an order created less than 3 hours ago';
          }
          return 'Order updated Successfully';
        }
      }
      return 'Order not found';
    }),
    getOrderById: jest.fn((param) => {
      for (let i = 0; i < mockOrderData.length; i++) {
        if (mockOrderData[i].id == param) {
          return mockOrderData[i];
        }
      }
      return 'Order not found';
    }),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue(mockOrdersService)
      .compile();

    orderController = app.get<OrderController>(OrderController);
  });

  describe('root', () => {
    it('should create an order', async () => {
      const mockOrderData = {
        dateTime: new Date('2022-11-01T11:11:11.111Z'),
        totalFee: 4000,
        serviceId: 70,
      };
     
      const res = await orderController.addOrder(mockOrderData);
      expect(res).toBe(mockOrderData);
      expect(mockOrdersService.addOrder).toHaveBeenCalled();
    });

    it('should not update an order', async () => {
      const mockOrderData = {
        dateTime: new Date('2022-11-01T11:11:11.111Z'),
        totalFee: 4000,
        serviceId: 70,
      };
      console.log(
        ' order.controller.spec.ts:37 ~ it ~ mockOrderData',
        mockOrderData,
      );
      const param = { id: 1 };
      const res = await orderController.updateOrder(mockOrderData, param);
      expect(res).toBe('Cannot update an order created less than 3 hours ago');
    });

    it('should not update an order as order not found', async () => {
      const mockOrderData = {
        dateTime: new Date('2022-11-01T11:11:11.111Z'),
        totalFee: 4000,
        serviceId: 70,
      };
      const param = { id: 10 };
      const res = await orderController.updateOrder(mockOrderData, param);
      expect(res).toBe('Order not found');
    });

    it('should return return order', async () => {
      const param = { id: 1 };
      const res = await orderController.getOrderById(param);
      expect(res.id).toBe(1);
    });
  });
});
