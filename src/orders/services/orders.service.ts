import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {from} from 'rxjs';
import {Repository} from 'typeorm';
import {OrderEntity} from "../entities/order.entity";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
    ) {
    }

    public async getAllOrders(): Promise<any> {
        return from(this.orderRepository.find());
    }

    public async addOrder(body): Promise<any> {
        return from(this.orderRepository.save(body));
    }

    public async updateOrder(id, order): Promise<any> {
        const existingOrder = await this.orderRepository.findOne({
            where: {id: id},
        });
        if (!existingOrder) {
            throw new NotFoundException('Order does not exist');
        }
        const currentTime = new Date().getTime();
        const threeHourEarlierTime = currentTime - 3 * 60 * 60 * 1000;
        const updatedTime = new Date(existingOrder.updatedAt).getTime();
        const updatedTimeToIst = updatedTime + 5.5 * 60 * 60 * 1000;
        if (updatedTimeToIst > threeHourEarlierTime) {
            throw new ConflictException('Cannot update an order created less than 3 hours ago');
        }
        return from(this.orderRepository.update(id, order));
    }

    public async deleteOrder(id): Promise<any> {
        return from(this.orderRepository.delete({id}));
    }

    public async getOrderById(id): Promise<any> {
        return from(this.orderRepository.findOne({where: {id}}));
    }
}