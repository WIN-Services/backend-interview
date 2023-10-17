import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderDataService } from '../services/order-data.service';
import { CreateNewOrderDto } from '../dtos/create-new-order.dto';
import { isoStringPattern } from '../../../shared/constants/test';
import { PostgresModule } from '../../../shared/database/postgres/postgres.module';
import { WinServiceModule } from '../../win-service/win-service.module';
import { OrderResponse } from '../types/get-all-orders.type';
import { GetOrderQueryDto } from '../dtos/get-order.dto';
import {
  UpdateOrderBodyDto,
  UpdateOrderQueryDto,
} from '../dtos/update-order.dto';
import { OrderStatus } from '../../../shared/database/postgres/models/order.model';
import { DeleteOrderQueryDto } from '../dtos/delete-order.dto';

const testOrderObject = (order: OrderResponse) => {
  expect(order.id).toMatch(/order_.{10}/);
  expect(order.dateCreated).toMatch(isoStringPattern);
  expect(order.dateUpdated).toMatch(isoStringPattern);
  expect(typeof order.totalFee).toBe('number');
  expect(order.currencyCode).toMatch(/[a-zA-Z]{3}/);

  expect(Array.isArray(order.services)).toBe(true);
  order.services.forEach((service) => {
    expect(typeof service).toBe('object');
    expect(service.id).toMatch(/service_.{10}/);
    expect(service.name).toBeDefined();
    expect(typeof service.fee).toBe('number');
    expect(service.currencyCode).toMatch(/[a-zA-Z]{3}/);
    expect(service.dateCreated).toMatch(isoStringPattern);
    expect(service.dateUpdated).toMatch(isoStringPattern);
  });
  expect(order.totalFee).toBe(
    order.services.reduce((sum, service) => sum + service.fee, 0),
  );
};

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PostgresModule, WinServiceModule],
      controllers: [OrderController],
      providers: [OrderDataService],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createNewOrder', () => {
    it('should create a new order', async () => {
      const createNewOrderDto: CreateNewOrderDto = {
        services: ['service_e6f8dd219b'],
      };

      try {
        const { order } = await controller.createNewOrder(createNewOrderDto);
        testOrderObject(order);
      } catch (e) {
        expect(e.message).toBe(
          'An order already exists which is not yet processed',
        );
      }
    });
  });

  describe('getAllOrders', () => {
    it('should return all orders', async () => {
      const result = await controller.getAllOrders();
      expect(result.orders).toBeDefined();
      expect(Array.isArray(result.orders)).toBe(true);
      result.orders.forEach((order) => testOrderObject(order));
    });
  });

  describe('getOrder', () => {
    it('should return a specific order', async () => {
      const getOrderQuery: GetOrderQueryDto = {
        orderId: 'order_1a683589e0',
      };

      try {
        const result = await controller.getOrder(getOrderQuery);
        expect(result.order).toBeDefined();
        testOrderObject(result.order);
      } catch (e) {
        expect(e.message).toBe('No such order exists');
      }
    });
  });

  describe('updateOrder', () => {
    it('should update a specific order', async () => {
      const updateOrderQuery: UpdateOrderQueryDto = {
        orderId: 'order_1a683589e0',
      };
      const updateOrderBody: UpdateOrderBodyDto = {
        status: OrderStatus.PROCESSING,
      };

      try {
        const result = await controller.updateOrder(
          updateOrderQuery,
          updateOrderBody,
        );
        expect(result.order).toBeDefined();
        testOrderObject(result.order);
      } catch (e) {
        expect(e.message).toMatch(/(No Updates Provided|No such order exists)/);
      }
    });
  });

  describe('deleteOrder', () => {
    it('should delete a specific order', async () => {
      const deleteOrderQuery: DeleteOrderQueryDto = {
        orderId: 'order_1a683589e',
      };

      try {
        const result = await controller.deleteOrder(deleteOrderQuery);
        expect(result.success).toBeDefined();
        expect(result.success).toBe(true);
      } catch (e) {
        expect(e.message).toBe('No such order exists');
      }
    });
  });
});
