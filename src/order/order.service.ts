// order.service.ts
import {HttpException, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Order} from './order.model';
import {ServiceRecord} from './service-record.model';
import {CreateOrderDto} from "./dto/create-order.dto";
import {Sequelize} from "sequelize-typescript";
import {OrderServiceRecord} from "./order-service-record.model";
import {Op} from "sequelize";
import {UpdateOrderDto} from "./dto/update-order.dto";

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order) private orderModel: typeof Order,
        private sequelize: Sequelize,
        @InjectModel(ServiceRecord) private serviceRecordModel: typeof ServiceRecord,
        @InjectModel(OrderServiceRecord) private orderServiceRecordModel: typeof OrderServiceRecord,
    ) {
    }

    async findOrderWithServiceRecordIds(serviceRecordIds) {
        const threeHrsBefore = this.getDate3HoursBefore()
        return this.orderServiceRecordModel.findOne({
            where: {
                [Op.or]: {
                    updatedAt: {
                        [Op.gt]: threeHrsBefore
                    },
                    createdAt: {
                        [Op.gt]: threeHrsBefore
                    },
                },
                serviceRecordId: {
                    [Op.in]: serviceRecordIds
                }
            },
        });

        // return orderIds.map(orderId => orderId.order_id);
    }

    async getAllOrders(): Promise<Order[]> {
        const allOrders = await this.orderModel.findAll({
            attributes: {
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
        return allOrders;
    }

    async getOrderById(id: string): Promise<Order> {
        const order = await this.orderModel.findByPk(id, {
            attributes: {
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
        if (!order) {
            throw new HttpException('Record not found!', 404);
        }
        return order;
    }


    getDate3HoursBefore() {
        const now = new Date();
        now.setHours(now.getHours() - 3);
        return now;
    }

    async createOrder(order: CreateOrderDto): Promise<Order> {
        const result = await this.findOrderWithServiceRecordIds(order.services)
        if (result) {
            throw new HttpException('A similar Order has been placed try after some time', 400);
        }
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

    async updateOrder(id: string, order: UpdateOrderDto): Promise<Order> {
        const [affectedCount, affectedRows] = await this.orderModel.update(order, {
            where: {id},
            returning: true,
        });
        if (affectedCount == 0) {
            throw new HttpException('The order with the id is not found', 400)
        }
        return affectedRows[0];
        // return this.getOrderById(id);

    }

    async deleteOrder(id: string): Promise<void> {
        await this.orderModel.destroy({where: {id}});
    }
}
