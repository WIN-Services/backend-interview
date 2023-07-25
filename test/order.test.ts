import orderRepository from '../app/modules/order/order.repository';
import { ORDER_MESSAGES } from '../app/modules/order/order.responses';
import orderService from '../app/modules/order/order.service';
import { IOrder } from '../app/modules/order/order.type';

const mockOrders = [
  {
    totalFee: 200,
    services: [
      {
        name: 'Testing',
      },
    ],
  },
];

describe('getAllOrder', () => {
  it('should return all orders from the repository', async () => {
    // Mock the orderRepository.getAllOrder() behavior
    jest
      .spyOn(orderRepository, 'getAllOrder')
      .mockResolvedValue(mockOrders as any);

    const result = await orderService.getAllOrder();
    expect(result).toEqual(mockOrders);
    expect(orderRepository.getAllOrder).toHaveBeenCalled();
  });
});

describe('getOrder', () => {
  it('should return the order with the given ID from the repository', async () => {
    const mockOrderId = '1';

    // Mock the orderRepository.getOrder() behavior
    jest
      .spyOn(orderRepository, 'getOrder')
      .mockResolvedValue(mockOrders[0] as any);

    const result = await orderService.getOrder(mockOrderId);
    expect(result).toEqual(mockOrders[0] as any);
    expect(orderRepository.getOrder).toHaveBeenCalledWith(mockOrderId);
  });

  it('should throw an error if the order with the given ID is not found', async () => {
    const mockOrderId = '999'; // An id that is not present in the mock data
    const mockOrder: IOrder | null = null;

    jest.spyOn(orderRepository, 'getOrder').mockResolvedValue(mockOrder);

    try {
      await orderService.getOrder(mockOrderId);
      fail('Expected getOrder to throw an error for non-existent order');
    } catch (error) {
      expect(error).toEqual(ORDER_MESSAGES.NOT_FOUND);
      expect(orderRepository.getOrder).toHaveBeenCalledWith(mockOrderId);
    }
  });
});
