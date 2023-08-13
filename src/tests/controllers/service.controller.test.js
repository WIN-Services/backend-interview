const statusCodes = require("http-status");
const apiResponse = require('../../utils/ApiResponse');
const { serviceController } = require('../../controllers');
const { serviceModelService, orderServicesModelService} = require('../../services');
const { negate } = require("../../utils/messageHandler");


describe('ServiceController', () => {
  
  describe('getAllServices', () => {
    it('should return a list of services', async () => {
      const mockServices = [{ id: 1, name: "Inspection" }, { id: 2, name: "Testing" }];
      serviceModelService.findAll = jest.fn().mockResolvedValue(mockServices);

      const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await serviceController.getAllServices({}, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(statusCodes.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(apiResponse('All services fetched successfully.', mockServices));
    });

    it('should return an empty response if no service are found', async () => {
      serviceModelService.findAll = jest.fn().mockResolvedValue([]);

      const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      await serviceController.getAllServices({}, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(statusCodes.NOT_FOUND);
      expect(mockResponse.json).toHaveBeenCalledWith(apiResponse('Service not found.', [], "f"));
    });

  });

  describe('getServiceById', () => {
    it('should get a service by valid serviceId', async () => {
      const mockService = { id: 1, name: "Inspection" };
      const mockRequest = {
        params: {
          serviceId: 1
        }
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Mock necessary services and their methods
      serviceModelService.findByPk = jest.fn().mockResolvedValue(mockService);

      // Call the controller function
      await serviceController.getServiceById(mockRequest, mockResponse);

      // Expectations
      expect(mockResponse.status).toHaveBeenCalledWith(statusCodes.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(apiResponse('Service fetched successfully.', mockService));
    });

    it('should return a not found response if serviceId is invalid', async () => {
      const mockService = { id: 1, name: "Inspection" };
      const mockRequest = {
        params: {
          serviceId: 123
        }
      };
      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };

      // Mock necessary services and their methods
      serviceModelService.findByPk = jest.fn().mockResolvedValue(null);

      // Call the controller function
      await serviceController.getServiceById(mockRequest, mockResponse);

      // Expectations
      expect(mockResponse.status).toHaveBeenCalledWith(statusCodes.NOT_FOUND);
      expect(mockResponse.json).toHaveBeenCalledWith(apiResponse(negate("Service", "nf"), [], "f"));
    });

    // More test cases...
  });
  
});
