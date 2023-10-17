import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PostgresService } from '../../../shared/database/postgres/postgres.service';
import {
  CreateNewOrderRequest,
  CreateNewOrderResponse,
} from '../types/create-new-order.type';
import {
  generateOrderId,
  Order,
  OrderStatus,
} from '../../../shared/database/postgres/models/order.model';
import { WinServiceDataService } from '../../win-service/services/win-service-data.service';
import { UpsertOrderServiceRecords } from '../types/order-data.type';
import { Service } from '../../../shared/database/postgres/models/service.model';
import { GetAllOrdersResponse } from '../types/get-all-orders.type';
import {
  UpdateOrderRequest,
  UpdateOrderResponse,
} from '../types/update-order.type';
import {
  DeleteOrderRequest,
  DeleteOrderResponse,
} from '../types/delete-order.type';
import { GetOrderRequest, GetOrdersResponse } from '../types/get-order.type';

@Injectable()
export class OrderDataService {
  constructor(
    private readonly postgresService: PostgresService,
    private readonly winServiceDataService: WinServiceDataService,
  ) {}

  async createOrder(
    data: CreateNewOrderRequest,
  ): Promise<CreateNewOrderResponse> {
    const [{ count: orderAlreadyExists }] = await this.postgresService.query<{
      count: number;
    }>(
      `
          SELECT count(*)::int FROM "Order" 
          WHERE 
            status != $1 
            AND "dateCreated" > NOW() - INTERVAL '3 HOUR'
        `,
      [OrderStatus.COMPLETED],
    );

    if (!!orderAlreadyExists) {
      throw new UnprocessableEntityException(
        'An order already exists which is not yet processed',
      );
    }

    const servicesPresent =
      await this.winServiceDataService.checkIfServiceExists(data.services);

    const [createdOrder] = await this.postgresService.query<Order>(
      `
        INSERT INTO "Order" 
            (id, "status") 
        VALUES ($1, $2)
        RETURNING *`,
      [generateOrderId(), data.status || OrderStatus.CREATED],
    );

    await this.upsertOrderServiceRecords(
      data.services.map((serviceId) => ({
        orderId: createdOrder.id,
        serviceId,
      })),
    );

    return {
      order: {
        ...createdOrder,
        dateCreated: new Date(createdOrder.dateCreated).toISOString(),
        dateUpdated: new Date(createdOrder.dateCreated).toISOString(),
        totalFee: servicesPresent.reduce<number>(
          (acc, service) => acc + service.fee,
          0,
        ),
        currencyCode: servicesPresent?.[0]?.currencyCode ?? null,
        services: servicesPresent.map((service) => ({
          ...service,
          dateCreated: new Date(service.dateCreated).toISOString(),
          dateUpdated: new Date(service.dateUpdated).toISOString(),
        })),
      },
    };
  }

  async upsertOrderServiceRecords(data: UpsertOrderServiceRecords) {
    if (!data.length) {
      return;
    }
    const { queryParams, queryValues } = data.reduce<{
      queryParams: string[];
      queryValues: string[];
    }>(
      (acc, { orderId, serviceId }) => {
        acc.queryParams.push(
          `($${acc.queryValues.length + 1}, $${acc.queryValues.length + 2})`,
        );
        acc.queryValues.push(orderId, serviceId);
        return acc;
      },
      {
        queryParams: [],
        queryValues: [],
      },
    );
    await this.postgresService.query(
      `
        INSERT INTO "OrderService" 
            ("orderId", "serviceId") 
        VALUES ${queryParams.join(', ')}
        ON CONFLICT DO NOTHING
      `,
      queryValues,
    );
  }

  async getAllServicesInOrder(orderId: string) {
    return this.postgresService.query<Service>(
      `
          SELECT "Service".* FROM "OrderService"
          JOIN "Service" ON "Service".id = "OrderService"."serviceId"
          WHERE "orderId" = $1
        `,
      [orderId],
    );
  }

  async deleteExistingOrderServiceRecords(orderId: string) {
    await this.postgresService.runDeleteQuery(
      `
          DELETE FROM "OrderService"
          WHERE "orderId" = $1
        `,
      [orderId],
    );
  }

  async getAllOrders() {
    return this.getOrders();
  }

  async getOrders(orderIds?: string[]): Promise<GetAllOrdersResponse> {
    let whereClause = '';
    const queryValues = [];
    if (orderIds && orderIds.length) {
      whereClause = 'WHERE "orderId" = ANY($1)';
      queryValues.push(orderIds);
    }

    const orders = await this.postgresService.query<
      Order & {
        totalFee: number;
        currencyCode: string;
        services: Array<Service>;
      }
    >(
      `
          SELECT "Order".id,
                 "Order".status,
                 "Order"."dateCreated",
                 "Order"."dateUpdated",
                 SUM("Service".fee)            as "totalFee",
                 MAX("Service"."currencyCode") AS "currencyCode",
                 JSON_AGG(JSON_BUILD_OBJECT(
                         'id', "Service".id,
                         'name', "Service"."name",
                         'description', "Service"."description",
                         'fee', "Service".fee,
                         'currencyCode', "Service"."currencyCode",
                         'dateCreated', "Service"."dateCreated",
                         'dateUpdated', "Service"."dateUpdated"
                     ))                        AS "services"
          FROM "Order"
                   JOIN "OrderService"
                        ON "OrderService"."orderId" = "Order".id
                   JOIN "Service"
                        ON "Service".id = "OrderService"."serviceId"
          ${whereClause}
          GROUP BY "Order".id
        `,
      queryValues,
    );

    return {
      orders: orders.map((order) => ({
        ...order,
        services: order.services.map((service) => ({
          ...service,
          dateCreated: new Date(service.dateCreated).toISOString(),
          dateUpdated: new Date(service.dateUpdated).toISOString(),
        })),
        dateCreated: new Date(order.dateCreated).toISOString(),
        dateUpdated: new Date(order.dateUpdated).toISOString(),
      })),
    };
  }

  async getOrder({ orderId }: GetOrderRequest): Promise<GetOrdersResponse> {
    const {
      orders: [order],
    } = await this.getOrders([orderId]);
    if (!order) {
      throw new NotFoundException('No such order exists');
    }
    return {
      order,
    };
  }

  async getOrderDataById(orderId: string): Promise<Order> {
    const [order] = await this.postgresService.query<Order>(
      `
        SELECT * FROM "Order"
        WHERE id = $1
        `,
      [orderId],
    );
    return order;
  }

  async updateOrder({
    orderId,
    ...updates
  }: UpdateOrderRequest): Promise<UpdateOrderResponse> {
    if (!Object.values(updates).filter(Boolean).length) {
      throw new BadRequestException(`No Updates Provided`);
    }

    let order = await this.getOrderDataById(orderId);
    if (!order) {
      throw new NotFoundException(`No such order exists`);
    }

    let servicesPresent: Service[] = [];
    if (updates.services?.length) {
      servicesPresent = await this.winServiceDataService.checkIfServiceExists(
        updates.services,
      );
      await this.deleteExistingOrderServiceRecords(orderId);
      await this.upsertOrderServiceRecords(
        updates.services.map((serviceId) => ({
          orderId,
          serviceId,
        })),
      );
    } else {
      servicesPresent = await this.getAllServicesInOrder(orderId);
    }

    if (updates.status) {
      [order] = await this.postgresService.query<Order>(
        `
         UPDATE "Order"
            SET "status" = $1,
            "dateUpdated" = NOW()
         WHERE id = $2
         RETURNING *
      `,
        [updates.status, orderId],
      );
    }

    return {
      order: {
        ...order,
        dateCreated: new Date(order.dateCreated).toISOString(),
        dateUpdated: new Date(order.dateUpdated).toISOString(),
        totalFee: servicesPresent.reduce<number>(
          (acc, service) => acc + service.fee,
          0,
        ),
        currencyCode: servicesPresent?.[0]?.currencyCode ?? null,
        services: servicesPresent.map((service) => ({
          ...service,
          dateCreated: new Date(service.dateCreated).toISOString(),
          dateUpdated: new Date(service.dateUpdated).toISOString(),
        })),
      },
    };
  }

  async deleteOrder({
    orderId,
  }: DeleteOrderRequest): Promise<DeleteOrderResponse> {
    const isDeleted = await this.postgresService.runDeleteQuery(
      `
          DELETE FROM "Order"
          WHERE id = $1
        `,
      [orderId],
    );

    if (!isDeleted) {
      throw new BadRequestException('No such order exists');
    }

    return {
      success: true,
    };
  }
}
