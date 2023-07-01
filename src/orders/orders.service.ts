import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto, Service } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderDocument } from './entities/order.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  /***
   * Creates a new order
   */
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // ASSUMPTION - ALL requested services are present in the DB
    this.logger.log(`Inside ${OrdersService.name}:${this.create.name} `);
    try {
      return (await this.orderModel.create({
        services: createOrderDto.services,
        user_id: createOrderDto.user_id,
        total_amount: this.amountReducer(createOrderDto.services),
      })) as Order;
    } catch (error) {
      this.logger.error(`Unable to create Order, error occurred ${error}`);
      throw new InternalServerErrorException();
    }
  }

  /***
   * Adds up all the amount from services
   */
  amountReducer(services: Service[]): number {
    this.logger.log(`Inside ${OrdersService.name}:${this.amountReducer.name} `);
    return services.reduce(
      (accumulator, service) => accumulator + service.amount,
      0,
    );
  }

  /***
   * Find all the Orders using pagination parameters
   */
  async findAll(page: number, page_size: number): Promise<Order[]> {
    this.logger.log(`Inside ${OrdersService.name}:${this.findAll.name} `);
    try {
      return await this.orderModel
        .find()
        .sort({ created_at: -1 })
        .limit(page_size)
        .skip(page_size * page)
        .lean();
    } catch (error) {
      this.logger.error(`Something went wrong while fetching orders ${error}`);
      throw new InternalServerErrorException();
    }
  }

  /***
   * Find a order by it ID
   */
  async findOne(id: string) {
    this.logger.log(`Inside ${OrdersService.name}:${this.findOne.name} `);
    let order;
    try {
      order = await this.orderModel.findOne({
        _id: id,
      });
    } catch (error) {
      this.logger.error(`Something went wrong while finding orders ${error}`);
      throw new InternalServerErrorException();
    }
    if (order) return order;
    throw new NotFoundException(`Order ${id} not found`);
  }

  /***
   * Updates a order by it ID
   * @throws BadRequestException if order is updated before 3 hours of creation or updation
   */
  async update(updateOrderDto: UpdateOrderDto) {
    this.logger.log(`Inside ${OrdersService.name}:${this.update.name} `);
    let pastOrder: Order = null;
    // Fetch the order that was placed previously
    try {
      pastOrder = (await this.orderModel.findOne({
        _id: updateOrderDto.order_id,
        is_deleted: false,
      })) as Order;
    } catch (e) {
      this.logger.error(`Unable to update order.Error occurred ${e}`);
      throw new InternalServerErrorException();
    }
    // If not found throw exception
    if (pastOrder === null) throw new NotFoundException();

    const { updated_at } = pastOrder;

    const currentTime = new Date();
    const diffInMs = Math.abs(currentTime.getTime() - updated_at.getTime());
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 3) {
      const updateAfter = new Date(
        updated_at.getTime() + 3 * 60 * 60 * 1000,
      ).toDateString();
      throw new BadRequestException(
        `You can only update order after ${updateAfter} hours`,
      );
    }
    const total_amount = this.amountReducer(updateOrderDto.services);
    // update order and return Order object
    try {
      return (await this.orderModel.findOneAndUpdate(
        {
          _id: updateOrderDto.order_id,
          is_deleted: false,
        },
        {
          total_fee: total_amount,
          order_items: updateOrderDto.services,
        },
        { returnOriginal: false },
      )) as Order;
    } catch (e) {
      this.logger.error(`${this.update.name} : Error Occurred ${e.message}`);
      throw new InternalServerErrorException();
    }
  }

  /***
   * Deltes the provided order by id
   * @throws BadRequestException when either order is not found or already deleted
   */
  async remove(id: string) {
    this.logger.log(`Inside ${OrdersService.name}:${this.remove.name} `);
    let res;
    try {
      res = await this.orderModel.updateOne(
        {
          _id: id,
          is_deleted: false,
        },
        {
          is_deleted: true,
        },
      );
    } catch (error) {
      this.logger.error(`Something went wrong while finding orders ${error}`);
      throw new InternalServerErrorException();
    }
    if (res.modifiedCount === 1) {
      return { success: true };
    } else {
      throw new BadRequestException(
        `Order: ${id} is either already deleted or does not exist`,
      );
    }
  }
}
