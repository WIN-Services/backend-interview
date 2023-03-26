import {Test, TestingModule} from '@nestjs/testing';
import {OrdersController} from './orders.controller';
import {OrdersService} from '../services/orders.service';

describe('OrdersController', () => {
    let orderController: OrdersController;
    const mockOrderData = [
        {
            "id": 1,
            "datetime": "2022-11-01T11:11:11.111Z",
            "totalfee": 100,
            "services": [
                {
                    "id": "789"
                }
            ],
            "isArchived": false,
            "createdAt": "2023-03-26T10:19:18.144Z",
            "updatedAt": "2023-03-26T10:19:18.144Z"
        },
        {
            "id": 4,
            "datetime": "2022-11-01T11:11:11.111Z",
            "totalfee": 100,
            "services": [
                {
                    "id": "781"
                },
                {
                    "id": "789"
                }
            ],
            "isArchived": false,
            "createdAt": "2023-03-26T10:36:27.272Z",
            "updatedAt": "2023-03-26T10:36:27.272Z"
        },
        {
            "id": 5,
            "datetime": "2022-11-01T11:11:11.111Z",
            "totalfee": 100,
            "services": [
                {
                    "id": "125"
                },
                {
                    "id": "789"
                }
            ],
            "isArchived": false,
            "createdAt": "2023-03-26T10:36:36.007Z",
            "updatedAt": "2023-03-26T10:36:36.007Z"
        },
        {
            "id": 6,
            "datetime": "2022-11-01T11:11:11.111Z",
            "totalfee": 100,
            "services": [
                {
                    "id": "125"
                },
                {
                    "id": "789"
                },
                {
                    "id": "781"
                }
            ],
            "isArchived": false,
            "createdAt": "2023-03-26T10:36:52.856Z",
            "updatedAt": "2023-03-26T10:36:52.856Z"
        }
    ];
    const mockOrdersService = {
        addOrder: jest.fn((dto) => {
            return dto;
        }),
        updateOrder: jest.fn((param, dto) => {
            for (let i = 0; i < mockOrderData.length; i++) {
                if (mockOrderData[i].id == param) {
                    const currentTime = new Date().getTime();
                    const threeHourEarlierTime = currentTime - 3 * 60 * 60 * 1000;
                    const updatedTime = new Date(mockOrderData[i].updatedAt).getTime();
                    const updatedTimeToIst = updatedTime + 5.5 * 60 * 60 * 1000;
                    if (updatedTimeToIst > threeHourEarlierTime) {
                        return 'Cannot update an order created less than 3 hours ago';
                    }
                    return 'Order updated Successfully';
                }
            }
            return 'Order not found';
        }),
        getOrderById: jest.fn((param) => {
            for (let i = 0; i < mockOrderData.length; i++) {
                if (mockOrderData[i].id == param) {
                    return mockOrderData[i];
                }
            }
            return 'Order not found';
        }),
    };

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [OrdersController],
            providers: [OrdersService],
        })
            .overrideProvider(OrdersService)
            .useValue(mockOrdersService)
            .compile();

        orderController = app.get<OrdersController>(OrdersController);
    });

    describe('root', () => {
        it('should create an order', async () => {
            const mockOrderData = {
                datetime: new Date('2022-11-01T11:11:11.111Z'),
                totalfee: 4000,
                services: [{id: 70}],
            };

            const res = await orderController.addOrder(mockOrderData);
            expect(res).toBe(mockOrderData);
            expect(mockOrdersService.addOrder).toHaveBeenCalled();
        });

        it('should not update an order', async () => {
            const mockOrderData = {
                datetime: new Date('2022-11-01T11:11:11.111Z'),
                totalfee: 4000,
                services: [{id: 70}],
            };
            console.log(
                ' order.controller.spec.ts:37 ~ it ~ mockOrderData',
                mockOrderData,
            );
            const param = {id: 1};
            const res = await orderController.updateOrder(mockOrderData, param);
            expect(res).toBe('Cannot update an order created less than 3 hours ago');
        });

        it('should not update an order as order not found', async () => {
            const mockOrderData = {
                datetime: new Date('2022-11-01T11:11:11.111Z'),
                totalfee: 4000,
                services: [{id: 70}],
            };
            const param = {id: 10};
            const res = await orderController.updateOrder(mockOrderData, param);
            expect(res).toBe('Order not found');
        });

        it('should return return order', async () => {
            const param = {id: 1};
            const res = await orderController.getOrderById(param);
            expect(res.id).toBe(1);
        });
    });
});