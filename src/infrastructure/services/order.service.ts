import { inject, injectable } from "inversify";
import { BaseService } from "../../shared/services/base.service";
import TYPES from "../type";
import { IOrder } from "../../models/order.model";
import { IOrderService as IOrderServiceModel } from "../../models/order.service.model";
import { IOrderRepository } from "../respositories/order.repository";
import { IOrderServiceRepository } from "../respositories/order.service.repository";
import { IOrderCreationModel, IOrderDetails } from "../api.models/order.interface";
import { CustomError } from "../../shared/utils/custom.error";


export interface IOrderService {
    createOrder(model: IOrderCreationModel): Promise<IOrderCreationModel>;
    getOrder(orderId: number): Promise<IOrderDetails>;
    listOrder(): Promise<IOrder[]>;
    updateOrder(orderId: number, dataToUpdate: Partial<IOrder>): Promise<number>;
    deleteOrder(orderId: number): Promise<number>;
}

@injectable()
export class OrderService extends BaseService implements IOrderService {

    constructor(
        @inject(TYPES.OrderRepository) private orderRepository: IOrderRepository,
        @inject(TYPES.OrderServiceRepository) private orderServiceRepository: IOrderServiceRepository,
    ) {
        super();
    }

    public async createOrder(model: IOrderCreationModel): Promise<IOrderCreationModel> {
        const orderToCreate = {
            datetime: model.datetime,
            totalfee: model.totalfee
        } as IOrder;
        const orderCreated = await this.orderRepository.create(orderToCreate);

        const orderServiceToCreate = model.services.map(el => ({
            orderId: orderCreated.id,
            serviceId: el
        }));
        await this.orderServiceRepository.createMany(orderServiceToCreate as IOrderServiceModel[]);
        model.id = orderCreated.id;
        return model;
    }

    public async getOrder(orderId: number): Promise<IOrderDetails> {
        const order = await this.orderRepository.get(orderId);
        if (!order) {
            throw new CustomError(new Error("Order not found"), 404);
        }
        const orderToReturn = {
            id: order.id,
            datetime: order.datetime,
            totalfee: order.totalfee,
            services: order.orderServices?.map(el => +el.serviceId)!
        }
        return orderToReturn;
    }

    public listOrder(): Promise<IOrder[]> {
        return this.orderRepository.findAll();
    }

    public async updateOrder(orderId: number, dataToUpdate: Partial<IOrderCreationModel>): Promise<number> {
        // Your service should return an error on creation/updating an order within 3 hrs of a pre-existing order
        const existingOrder = await this.orderRepository.get(orderId);
        if (existingOrder && this.isOrderCreatedInLastThreeOur(existingOrder.datetime)) {
            throw new CustomError(new Error("Most recent order can not be updated"), 400);
        }
        if (dataToUpdate.services && dataToUpdate.services.length) {
            // Remove existing associtation in OrderService and create new
            await this.orderServiceRepository.delete(orderId);
            const orderServiceToCreate = dataToUpdate.services.map(el => ({
                orderId,
                serviceId: el
            }));
            await this.orderServiceRepository.createMany(orderServiceToCreate as IOrderServiceModel[]);

            delete dataToUpdate.services;
        }
        return this.orderRepository.updateOrder(orderId, dataToUpdate);
    }

    public async deleteOrder(orderId: number): Promise<number> {
        await this.orderServiceRepository.delete(orderId);
        return this.orderRepository.delete(orderId);
    }

    private isOrderCreatedInLastThreeOur(dateTime: Date): boolean {
        const THREE_HOUR = 3 * 1000 * 60 * 60;
        const anHourAgo = Date.now() - THREE_HOUR;


        return new Date(dateTime).getTime() > anHourAgo;
    }
}