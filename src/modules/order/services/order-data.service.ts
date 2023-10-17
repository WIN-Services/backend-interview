import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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
        totalFee: servicesPresent.reduce<number>(
          (acc, service) => acc + service.fee,
          0,
        ),
        currencyCode: servicesPresent?.[0]?.currencyCode ?? null,
        services: servicesPresent,
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
}
