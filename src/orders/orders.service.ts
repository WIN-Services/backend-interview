import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductServiceRepository } from 'src/product-service/product-service.repository';
import { OrdersRepository } from './order.repository';
import { HttpError } from 'src/errors/custom.errors';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);
  constructor(
    private readonly productServiceRepository: ProductServiceRepository,
    private readonly ordersRepository: OrdersRepository
  ) { }

  async placeOrder(createOrderDto: CreateOrderDto) {

    let productServices, order, total_amount = 0;

    try {
      productServices = await this.productServiceRepository.productServiceModel.find({ _id: { $in: createOrderDto.product_service_ids }, is_active: true }).lean();
    } catch (error) {
      this.logger.error(
        `Error occurred while find existing product service ${this.placeOrder.name}:${error.message}`,
      );
      throw HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong');
    }

    if (!productServices.length) {
      throw HttpError(HttpStatus.BAD_REQUEST, `product service not found`);
    }

    productServices.forEach(element => {
      total_amount += element.price;
    })

    console.log(total_amount);

    let order_payload = {
      items: productServices,
      total_price: total_amount,
      customer_id: createOrderDto.customer_id
    }

    try {
      order = await this.ordersRepository.orderModel.create(order_payload);
    } catch (error) {
      this.logger.error(
        `Error occurred while find existing product service ${this.placeOrder.name}:${error.message}`,
      );
      throw HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong');
    }

    return order
  }

  async listAllOrders(page: number = 0, page_size: number = 10) {
    let orders;
    try {
      orders = await this.ordersRepository.orderModel.find({ is_active: true })
        .sort({ created_at: -1 })
        .limit(page_size)
        .skip(page_size * page)
        .lean();
    } catch (error) {
      this.logger.error(
        `Error occurred while finding orders ${this.listAllOrders.name}:${error.message}`,
      );
      throw HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong');
    }

    return orders;
  }

  async getOrderById(id: string) {
    let order;
    try {
      order = await this.ordersRepository.orderModel.findOne({ _id: id, is_active: true }).lean();
    } catch (error) {
      this.logger.error(
        `Error occurred while finding a order ${this.getOrderById.name}:${error.message}`,
      );
      throw HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong');
    }

    if (!order) {
      throw HttpError(HttpStatus.BAD_REQUEST, `order with ${id} not found`);
    }

    return order;
  }

  async updateOrderById(id: string, updateOrderDto: UpdateOrderDto) {
    let productServices, order, total_amount = 0;

    try {
      order = await this.ordersRepository.orderModel.findOne({ _id: id, is_active: true }).lean();
    } catch (error) {
      this.logger.error(
        `Error occurred while finding the order ${this.updateOrderById.name}:${error.message}`,
      );
      throw HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong');
    }

    if (!order) {
      throw HttpError(HttpStatus.BAD_REQUEST, `order with ${id} not found`);
    }

    try {
      productServices = await this.productServiceRepository.productServiceModel.find({ _id: { $in: updateOrderDto.product_service_ids }, is_active: true }).lean();
    } catch (error) {
      this.logger.error(
        `Error occurred while find existing product service ${this.placeOrder.name}:${error.message}`,
      );
      throw HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong');
    }

    if (!productServices.length) {
      throw HttpError(HttpStatus.BAD_REQUEST, `product service not found`);
    }

    console.log(productServices);
    
    productServices.forEach(element => {
      total_amount += element.price;
    })

    console.log(total_amount);

    let updatedOrderPayload = {
      items: [...order.items, ...productServices],
      total_price: order.total_price + total_amount,
    }

    try {
      order = await this.ordersRepository.orderModel.findOneAndUpdate({ _id: id, is_active: true }, updatedOrderPayload, { new: true });
    } catch (error) {
      this.logger.error(
        `Error occurred while updating the order ${this.updateOrderById.name}:${error.message}`,
      );
      throw HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong');
    }

    return order
  }

  async deleteOrderById(id: string) {
    let order;
    try {
      order = await this.ordersRepository.orderModel.findOneAndUpdate({ _id: id, is_active: true }, { is_active: false }, { new: true })
    } catch (error) {
      this.logger.error(
        `Error occurred while finding existing order ${this.deleteOrderById.name}:${error.message}`,
      );
      throw HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong');
    }

    if (!order) {
      throw HttpError(HttpStatus.BAD_REQUEST, `product service not found with id: ${id}`);
    }

    return "product service deleted successfully!"
  }
}
