const statusCodes = require("http-status");
const orderController = require('../../controllers/order.controller');
const { orderService } = require("../../services");
const apiResponse = require('../../utils/ApiResponse');

describe('orderController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllOrders', () => {
    it('should return a list of orders', async () => {
      const mockOrders = [{ id: 1, total_fee: 100 }, { id: 2, total_fee: 200 }];
      orderService.findAll = jest.fn().mockResolvedValue(mockOrders);

      const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await orderController.getAllOrders({}, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(statusCodes.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(apiResponse('All orders fetched successfully.', mockOrders));
    });

    it('should return an empty response if no orders are found', async () => {
      orderService.findAll = jest.fn().mockResolvedValue([]);

      const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await orderController.getAllOrders({}, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(statusCodes.NOT_FOUND);
      expect(mockResponse.json).toHaveBeenCalledWith(apiResponse('Orders not found.', [], "f"));
    });

  });

  describe('getOrderById', () => {
    it('should return the order when a valid orderId is provided', async () => {
      const mockOrder = { id: 1, total_fee: 100 };
      orderService.findByPk = jest.fn().mockResolvedValue(mockOrder);
  
      const mockRequest = { params: { orderId: 1 } };
      const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await orderController.getOrderById(mockRequest, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(statusCodes.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(apiResponse('Order fetched successfully.', mockOrder));
    });
  
    it('should return a not found response when an invalid orderId is provided', async () => {
      orderService.findByPk = jest.fn().mockResolvedValue(null);
  
      const mockRequest = { params: { orderId: 999 } };
      const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await orderController.getOrderById(mockRequest, mockResponse);
  
      expect(mockResponse.status).toHaveBeenCalledWith(statusCodes.NOT_FOUND);
      expect(mockResponse.json).toHaveBeenCalledWith(apiResponse('Order not found.', [], "f"));
    });
  
  });

 
});
