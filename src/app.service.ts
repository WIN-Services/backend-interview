import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { FindOperator, LessThanOrEqual, Repository } from 'typeorm';
import * as EXPECTIONS from './common/customExceptions/custom.exceptions';
import { UpdateOrderRequestDto } from './dto/request/update-order.dto';
import { DeleteOrderRequestDto } from './dto/request/delete-order.dto';
import { CreateOrderRequestDto } from './dto/request/create-order.dto';
import * as moment from 'moment';
import { Service } from './entities/service.entity';

@Injectable()
export class AppService {
  readonly logger = new Logger(AppService.name);
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Service) private serviceRepo: Repository<Service>,
  ) {}
  async getOrder(id: string) {
    this.logger.log(
      `--- Entering in handler to get order with given id: ${id}`,
    );
    try {
      const order = await this.orderRepo.findOne({
        where: {
          id,
        },
      });

      if (!order) {
        throw new EXPECTIONS.NOT_FOUND_EXCEPTION();
      }

      this.logger.log(`--- Successfully fetched the order : ${order}`);
      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully fetched the order.',
        data: order,
      };
    } catch (err) {
      this.logger.error(
        `--- Error occured in handler to get order from order id: ${id}`,
        JSON.stringify(err),
      );
      if (err instanceof HttpException) {
        throw err;
      } else {
        // Handle unexpected errors
        throw new EXPECTIONS.CUSTOM_EXCEPTION(
          HttpStatus.INTERNAL_SERVER_ERROR,
          err.message,
        );
      }
    }
  }

  async updateOrder(payload: UpdateOrderRequestDto) {
    this.logger.log(
      `--- Entering in handler to update order payload: ${payload} ---`,
    );
    try {
      // Check if there are any pre-existing orders within 3 hours
      const threeHoursAgo = new Date(new Date().getTime());

      const existingOrders = await this.orderRepo.find({
        where: {
          userId: payload.userId, // Replace 'userId' with the actual property that associates the order with the user
          datetime: LessThanOrEqual(threeHoursAgo), // Find orders within the last 3 hours
        },
      });

      if (existingOrders.length > 0) {
        throw new EXPECTIONS.CUSTOM_EXCEPTION(
          HttpStatus.BAD_REQUEST,
          'Cannot create or update order within 3 hours of a pre-existing order',
        );
      }
      const order = await this.orderRepo.findOne({
        where: {
          id: payload.id,
        },
      });

      if (!order) {
        throw new EXPECTIONS.NOT_FOUND_EXCEPTION();
      }
      this.logger.log(`--- Successfully fetched the order : ${order} ---`);

      // update order
      order.totalfee = payload.totalfee;
      await this.orderRepo.save(order);
      this.logger.log(`--- Successfully updated the order : ${order} ---`);
      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully updated order.',
        data: order,
      };
    } catch (err) {
      this.logger.error(
        `--- Error occured in handler to update order payload: ${payload} ---`,
        JSON.stringify(err),
      );
      if (err instanceof HttpException) {
        throw err;
      } else {
        // Handle unexpected errors
        throw new EXPECTIONS.CUSTOM_EXCEPTION(
          HttpStatus.INTERNAL_SERVER_ERROR,
          err.message,
        );
      }
    }
  }

  async deleteOrder(id: string) {
    this.logger.log(
      `--- Entering in handler to delete order payload: ${id} ---`,
    );
    try {
      const order = await this.orderRepo.delete({
        id: id,
      });

      if (order.affected == 0) {
        throw new EXPECTIONS.NOT_FOUND_EXCEPTION();
      }

      this.logger.log(`--- Successfully deleted the order : ${order} ---`);
      return {
        statusCode: HttpStatus.OK,
        message: `Successfully deleted the order ${id}`,
        data: [],
      };
    } catch (err) {
      this.logger.error(
        `--- Error occured in handler to delete order payload: ${id} ---`,
        JSON.stringify(err),
      );
      if (err instanceof HttpException) {
        throw err;
      } else {
        // Handle unexpected errors
        throw new EXPECTIONS.CUSTOM_EXCEPTION(
          HttpStatus.INTERNAL_SERVER_ERROR,
          err.message,
        );
      }
    }
  }

  async createOrder(payload: CreateOrderRequestDto) {
    this.logger.log(
      `--- Entering in handler to create order payload: ${payload} ---`,
    );
    try {
      // Check if there are any pre-existing orders within 3 hours
      const threeHoursAgo = new Date(new Date().getTime());

      const existingOrders = await this.orderRepo.find({
        where: {
          userId: payload.userId, // Replace 'userId' with the actual property that associates the order with the user
          datetime: LessThanOrEqual(threeHoursAgo), // Find orders within the last 3 hours
        },
      });

      if (existingOrders.length > 0) {
        throw new EXPECTIONS.CUSTOM_EXCEPTION(
          HttpStatus.BAD_REQUEST,
          'Cannot create or update order within 3 hours of a pre-existing order',
        );
      }
      const new_order = this.orderRepo.create({
        userId: payload.userId,
        totalfee: payload.totalfee,
        services: payload.services,
      });

      await this.orderRepo.save(new_order);
      this.logger.log(
        `--- Order has been created successfully: ${new_order} ---`,
      );
      return {
        statusCode: HttpStatus.OK,
        message: `Order created.`,
        data: new_order,
      };
    } catch (err) {
      this.logger.error(
        `--- Error occured in handler to create order payload: ${JSON.stringify(
          payload,
        )} ---`,
        JSON.stringify(err),
      );
      if (err?.code == '23503') {
        const existingServices = await this.serviceRepo.find();
        let msg = '';

        existingServices.map((item) => {
          msg += `${item.name}:${item.id}, `;
        });
        throw new EXPECTIONS.CUSTOM_EXCEPTION(
          HttpStatus.INTERNAL_SERVER_ERROR,
          `Only these services: ${msg} are allowed to add, please add one of the id`,
        );
      } else if (err instanceof HttpException) {
        throw err;
      } else {
        // Handle unexpected errors
        throw new EXPECTIONS.CUSTOM_EXCEPTION(
          HttpStatus.INTERNAL_SERVER_ERROR,
          err.message,
        );
      }
    }
  }

  async getAllOrders() {
    try {
      const orders = await this.orderRepo.find({
        relations: ['services'], // Include the services using the defined relation
      });

      if (!orders || orders.length === 0) {
        throw new EXPECTIONS.NOT_FOUND_EXCEPTION();
      }

      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully fetched all orders.',
        data: orders,
      };
    } catch (err) {
      if (err instanceof EXPECTIONS.NOT_FOUND_EXCEPTION) {
        throw err;
      } else {
        // Handle unexpected errors
        throw new EXPECTIONS.CUSTOM_EXCEPTION(
          HttpStatus.INTERNAL_SERVER_ERROR,
          err.message,
        );
      }
    }
  }
}
