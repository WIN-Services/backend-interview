import {Test, TestingModule} from '@nestjs/testing';
import {OrderController} from '../order/order.controller';
import {OrderService} from '../order/order.service';
import {AppModule} from "../app.module";
import {getModelToken, SequelizeModule} from "@nestjs/sequelize";
import {Order} from "../order/order.model";
import {ServiceRecord} from "../order/service-record.model";
import {OrderServiceRecord} from "../order/order-service-record.model";

describe('OrderController', () => {
    let orderController: OrderController;
    let orderService: OrderService;

    beforeEach(async () => {
        jest.mock('sequelize', () => {
            const mSequelize = {
                authenticate: jest.fn(),
                define: jest.fn(),
            };
            const actualSequelize = jest.requireActual('sequelize');
            return { Sequelize: jest.fn(() => mSequelize), DataTypes: actualSequelize.DataTypes };
        });
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            controllers: [OrderController],
            providers: [OrderService,
                {
                    provide: getModelToken(Order),
                    useValue: {},
                },
                {
                    provide: getModelToken(ServiceRecord),
                    useValue: {},
                },
                {
                    provide: getModelToken(OrderServiceRecord),
                    useValue: {},
                },
                {
                    provide: SequelizeModule,
                    useValue: {},
                },
            ],
        }).compile();

        orderController = module.get<OrderController>(OrderController);
        orderService = module.get<OrderService>(OrderService);
    });

    it('should be defined', () => {
        expect(orderController).toBeDefined();
    });


    describe('deleteOrder', () => {
        it('should delete the order with the specified ID', async () => {
            const orderId = '1';
            jest.spyOn(orderService, 'deleteOrder').mockResolvedValueOnce(undefined);

            await expect(orderController.deleteOrder(orderId)).resolves.toBeUndefined();
        });
    });
});
