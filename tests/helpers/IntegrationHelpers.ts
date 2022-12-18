import express from 'express';
import { Repository } from "sequelize-typescript";
import { sequelize } from '../../src/database/sequelize';
import { Service, Order, ServiceOrder } from '../../src/models';
import App from '../../src/app';
import ServicesController from '../../src/controllers/services.controller';
import OrdersController from '../../src/controllers/orders.controller';

let serviceRepository: Repository<Service>;
let orderRepository: Repository<Order>;
let serviceLookupRepository: Repository<ServiceOrder>;

export default class IntegrationHelpers {
    public static appInstance: express.Application;

    public static async getApp(): Promise<express.Application> {

        if (this.appInstance) {
            return this.appInstance;
        }

        await sequelize.sync({ force: true });

        orderRepository = sequelize.getRepository(Order);
        serviceRepository = sequelize.getRepository(Service);
        serviceLookupRepository = sequelize.getRepository(ServiceOrder);

        let api = new App([
            new ServicesController(serviceRepository, orderRepository),
            new OrdersController(serviceRepository, orderRepository, serviceLookupRepository)
        ])

        this.appInstance = api.app;
        return this.appInstance;
    }
};
