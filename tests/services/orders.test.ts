import { Request } from 'express';
import 'jest';
import { OrderService } from '../../services/orders'

describe('OrderService', () => {
    it('should not fetch order if orderId is not passed', async () => {
      const res = await new OrderService(<Request>{}).getOrder(undefined)
      expect(res.status).toBe(400)
      expect(res.data.message).toBe('orderId not present');
    });
});
