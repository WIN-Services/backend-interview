const orderController = require('../controllers/orderController');
const orderService = require('../services/orderService');

// Mock the req, res, and next objects
const mockRequest = () => {
    const req = {};
    req.params = jest.fn().mockReturnValue(req);
    req.body = jest.fn().mockReturnValue(req);
    return req;
};

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('orderController', () => {
    // Test getAllOrders function
    describe('getAllOrders', () => {
        test('should return all orders', async () => {
            const req = mockRequest();
            const res = mockResponse();

            // Mock the getAllOrders function from the orderService
            orderService.getAllOrders = jest.fn().mockResolvedValue(['order1', 'order2']);

            await orderController.getAllOrders(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(['order1', 'order2']);
        });

        test('should handle errors', async () => {
            const req = mockRequest();
            const res = mockResponse();

            // Mock the getAllOrders function to throw an error
            orderService.getAllOrders = jest.fn().mockRejectedValue(new Error('Database Error'));

            await orderController.getAllOrders(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Something went wrong!' });
        });
    });

});
