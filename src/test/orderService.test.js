const orderService = require('../services/orderService');
const Order = require('../models/orderModel');
const Service = require('../models/serviceModel');

// Mock Sequelize methods
const mockCreate = jest.fn();
const mockFindByPk = jest.fn();
const mockUpdate = jest.fn();
const mockDestroy = jest.fn();

jest.mock('../models/orderModel', () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  return dbMock.define('Order', {
    id: 1,
    datetime: new Date(),
    totalfee: 100,
  }, {
    instanceMethods: {
      save: mockUpdate,
      setServices: jest.fn(),
      destroy: mockDestroy,
    },
  });
});

jest.mock('../models/serviceModel');

describe('orderService', () => {
  // Mock data
  const mockServices = [];

  beforeEach(() => {
    jest.clearAllMocks(); 
  });


  test('createOrder throws error when existing orders found', async () => {
    // Mocking existing orders
    Order.findAll = jest.fn().mockResolvedValue([{ id: 2 }]);

    await expect(orderService.createOrder(new Date(), 100, mockServices)).rejects.toThrow('Cannot create order within 3 hours of an existing order');
  });


});
