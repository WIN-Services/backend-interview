// order.service.ts
import {HttpException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Order} from './order.model';
import {ServiceRecord} from './service-record.model';
import {CreateOrderDto} from "./dto/create-order.dto";
import {Sequelize} from "sequelize-typescript";
import {OrderServiceRecord} from "./order-service-record.model";
import {Op} from "sequelize";

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order) private orderModel: typeof Order,
        private sequelize: Sequelize,
        @InjectModel(ServiceRecord) private serviceRecordModel: typeof ServiceRecord,
        @InjectModel(OrderServiceRecord) private orderServiceRecordModel: typeof OrderServiceRecord,
    ) {
    }

    async getAllOrders(): Promise<Order[]> {
        const allOrders = await this.orderModel.findAll({
            attributes:{
                exclude: ['createdAt', 'updatedAt']
            },
            include: [{
                model: this.serviceRecordModel,
                through: {
                    attributes: [],
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }
            ],
        });
        // allOrders.map(order =>{
        //     order.services.forEach(obj => {
        //         delete  obj.OrderServiceRecord;
        //     })
        // // })
        // allOrders.map(order => {
        //     order.services.values()
        // })
        return allOrders;
    }

    async getOrderById(id: string): Promise<Order> {
        return this.orderModel.findByPk(id, {include: [ServiceRecord]});
    }

    async createOrder(order: CreateOrderDto): Promise<Order> {

        try {
            return this.sequelize.transaction(async () => {
                const services = await this.serviceRecordModel.findAll({
                    where:
                        {id: {[Op.or]: order.services}}
                })
                if (services.length != order.services.length) {
                    throw new HttpException('some service are not found', 400)
                }
                const createdOrder = await this.orderModel.create({datetime: new Date(), totalFee: order.totalFee});
                const allServiceOrderRecord = order.services.map((serviceId) => {
                    return {
                        orderId: createdOrder.id,
                        serviceRecordId: serviceId
                    }
                })
                await this.orderServiceRecordModel.bulkCreate(allServiceOrderRecord);
                return createdOrder;
            })
        } catch (e) {
            throw new HttpException('Some error occured', 500);
        }

    }

    async updateOrder(id: string, order: Order): Promise<Order> {
        await this.orderModel.update(order, {where: {id}});
        return this.getOrderById(id);
    }

    async deleteOrder(id: string): Promise<void> {
        await this.orderModel.destroy({where: {id}});
    }
}
