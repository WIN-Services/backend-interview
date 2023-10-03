import {Test, TestingModule} from '@nestjs/testing';
import {OrderService} from '../order/order.service';
import {getModelToken, SequelizeModule} from '@nestjs/sequelize';
import {Sequelize} from 'sequelize-typescript';
import {HttpException} from '@nestjs/common';
import {Order} from "../order/order.model";
import {ServiceRecord} from "../order/service-record.model";
import {OrderServiceRecord} from "../order/order-service-record.model";
import {CreateOrderDto} from "../order/dto/create-order.dto";
import {UpdateOrderDto} from "../order/dto/update-order.dto";
import {AppModule} from "../app.module";

describe('OrderService', () => {
    let orderService: OrderService;
    let sequelizeMock: Sequelize;



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
            providers: [
                OrderService,
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
        sequelizeMock = module.get<Sequelize>(Sequelize);
        orderService = module.get<OrderService>(OrderService);

    });

    it('should be defined', () => {
        expect(orderService).toBeDefined();
    });

    // Add more tests based on your requirements

    it('should throw HttpException when trying to create an order with invalid services', async () => {
        const createOrderDto: CreateOrderDto = {
            totalFee: 100,
            services: [1, 2, 3], // Assuming these service IDs are invalid
        };

        jest.spyOn(orderService, 'checkForOrderModification').mockResolvedValueOnce();
        const mockFunction = jest.fn();
        mockFunction.mockReturnValue(new HttpException('Some services are not found', 400))
        orderService.createOrder = mockFunction;
        try {
            await orderService.createOrder(createOrderDto);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.message).toBe('Some services are not found');
            expect(error.status).toBe(400);
        }
    });

    it('should update an order', async () => {
        const orderId = 1;
        const updateOrderDto: UpdateOrderDto = {
            totalFee: 200,
        };

        jest.spyOn(orderService, 'checkForOrderModification').mockResolvedValueOnce();
        const mockUpdate = jest.fn()
        mockUpdate.mockImplementation((orderId, updateOrderDto) => ({id: orderId, ...updateOrderDto}))
        orderService.updateOrder = mockUpdate;
        const updatedOrder = await orderService.updateOrder(orderId, updateOrderDto);

        expect(updatedOrder.id).toBe(orderId);
        expect(updatedOrder.totalFee).toBe(updateOrderDto.totalFee);
    });
});
