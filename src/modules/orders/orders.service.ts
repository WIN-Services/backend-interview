import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(DatabaseService) private readonly databaseService: DatabaseService,
  ) {}
  async createOrder(createOrderDto: CreateOrderDto) {
    try {
      const createOrder = await this.databaseService.executeQuery(
        `select * from win_insert_order($1, $2, $3)`,
        [
          createOrderDto.dateTime,
          createOrderDto.totalFee,
          createOrderDto.serviceId,
        ],
      );
      if (createOrder.length) return createOrder[0].win_insert_order;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async getAllOrders() {
    try {
      const getAllOrders = await this.databaseService.executeQuery(
        `select * from win_get_all_orders()`,
      );

      return {
        msg: getAllOrders.length
          ? 'Orders fetched successfully'
          : 'No Orders found',
        data: getAllOrders,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async getOrder(param: { id: string }) {
    try {
      const getOrder = await this.databaseService.executeQuery(
        `select * from win_get_all_order_by_id($1)`,
        [+param.id],
      );
      return {
        msg: getOrder.length ? 'Order fetched successfully' : 'No Order found',
        data: getOrder,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async updateOrder(param: { id: string }, updateOrderDto: UpdateOrderDto) {
    try {
      const updateOrder = await this.databaseService.executeQuery(
        `select * from win_update_order($1, $2, $3, $4)`,
        [
          +param.id,
          updateOrderDto.dateTime,
          updateOrderDto.totalFee,
          updateOrderDto.serviceId,
        ],
      );
      if (updateOrder.length) return updateOrder[0].win_update_order;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  async removeOrder(param: { id: string }) {
    try {
      const removeOrder = await this.databaseService.executeQuery(
        `select * from win_delete_order($1)`,
        [+param.id],
      );
      if (removeOrder.length) return removeOrder[0].win_delete_order;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
}
