import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel, Prop } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { OrderDocument, OrderEntity } from './entity/order.entity';
import { CreateOrderRequestDto } from './dto/create-order.dto';
import { UpdateOrderRequestDto } from './dto/update-order.dto';
import { Pagination } from '../utils/page-validations';
import { HttpError } from '../errors/custom.errors';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  private THREE_HOUR = 60 * 60 * 60 * 3;

  constructor(
    @InjectModel(OrderEntity.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(
    header,
    createOrderRequestDto: CreateOrderRequestDto,
  ): Promise<OrderEntity> {
    // Business Logic
    let amount = 0;
    // This logic can be changed according to business usecase.
    if(createOrderRequestDto?.order_items === null || createOrderRequestDto?.order_items?.length == 0){
      throw HttpError(
          HttpStatus.BAD_REQUEST,
          'Unable to create empty order.',
      );
    }

    for (let i = 0; i < createOrderRequestDto.order_items.length; i++) {
      // calculate order amount: By adding price of each item.
      amount = amount + createOrderRequestDto.order_items[i].amount;
    }


    // save order
    try {
      return (await new this.orderModel({
        user_id: createOrderRequestDto.user_id,
        total_fee: amount,
        order_items: createOrderRequestDto.order_items,
        is_deleted: false
      }).save()) as OrderEntity;
    } catch (e) {
      this.logger.error(`Unable to create Order. Error  occurred ${e}`);
      throw HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Unable to create order. Please try after some time.',
      );
    }
  }

  async updateOrder(
    header,
    updaterOrderRequestDto: UpdateOrderRequestDto,
  ): Promise<OrderEntity> {
    // Business Logic
    const requestTime = new Date();
    let amount = 0;
    // This logic can be changed according to business usecase.
    if(createOrderRequestDto?.order_items === null || createOrderRequestDto?.order_items?.length == 0){
      throw HttpError(
          HttpStatus.BAD_REQUEST,
          'Unable to create empty order.',
      );
    }

    for (let i = 0; i < updaterOrderRequestDto.order_items.length; i++) {
      // calculate order amount: By adding price of each item.
      amount = amount + updaterOrderRequestDto.order_items[i].amount;
    }
    let pastOrder: OrderEntity = null;
    try {
      pastOrder = (await this.orderModel.findOne({
        _id: updaterOrderRequestDto.id,
        is_deleted: false,
      })) as OrderEntity;
    } catch (e) {
      this.logger.error(`Unable to update order.Error occurred ${e}`);
      throw HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Unable to update order. Something went wrong.',
      );
    }

    if(pastOrder == null){
      throw HttpError(
          HttpStatus.NOT_FOUND,
          'Order not found.',
      );
    }
    // calculate time gap
    const seconds =
      Math.abs(requestTime.getTime() - pastOrder.updated_at.getTime()) / 1000;
    if (seconds < this.THREE_HOUR) {
      throw HttpError(
        HttpStatus.BAD_REQUEST,
        'Can not update your order. Please try again after some time.',
      );
    }
    // update order and return
    try {
      return await this.orderModel.findOneAndUpdate(
        {
          _id: updaterOrderRequestDto.id,
          is_deleted: false,
        },
        {
          total_fee: amount,
          order_items: updaterOrderRequestDto.order_items,
        },
          { returnOriginal: false }
      ) as OrderEntity;
    } catch (e) {
      this.logger.error(`Unable to update order. Error  occurred ${e}`);
      throw HttpError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Unable to update order. Something went wrong',
      );
    }
  }

  async getOrderById(header, id: string): Promise<OrderEntity> {
    let pastOrder: OrderEntity = null;
    try {
      pastOrder = (await this.orderModel.findOne({
        _id: id,
        is_deleted: false,
      })) as OrderEntity;
    } catch (e) {
      this.logger.error(`Unable to get order.Error occurred ${e}`);
      throw HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Unable to get order. Something went wrong.',
      );
    }

    if(pastOrder == null){
      throw HttpError(
          HttpStatus.NOT_FOUND,
          'Order not found.',
      );
    }
    return null;
  }

  async getAllOrders(header, pagination: Pagination): Promise<OrderEntity[]> {
    try {
      return await this.orderModel
          .find({
            is_deleted: false,
          })
          .sort({ created_at: -1 })
          .limit(pagination.page_size)
          .skip(pagination.page_size * pagination.page)
          .lean();
    } catch(e) {
      this.logger.error(
          `Error occurred : ${this.getAllOrders.name}:${e.message}`,
      );
      throw HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'something went wrong while getting order.',
      );
    }
  }

  async deleteOrder(header, id: string) {
    // update order and return
    try {
      await this.orderModel.updateOne(
          {
            _id: id,
            is_deleted: false,
          },
          {
            is_deleted: true
          },

      )
    } catch (e) {
      this.logger.error(`Unable to delete order. Error  occurred ${e}`);
      throw HttpError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Unable to delete order. Something went wrong',
      );
    }
  }
}
