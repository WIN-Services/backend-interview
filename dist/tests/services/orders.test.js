Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const orders_1 = require("../../services/orders");
describe('OrderService', () => {
    it('should not fetch order if orderId is not passed', async () => {
        const res = await new orders_1.OrderService({}).getOrder(undefined);
        expect(res.status).toBe(400);
        expect(res.data.message).toBe('orderId not present');
    });
});
