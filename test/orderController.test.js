const { getAllOrders } = require('../controllers/orderController');
const dynamoDB = require('../dbConnection/db');

jest.mock('../dbConnection/db', () => ({
  scan: jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValue({ Items: ['order1', 'order2'] }),
  }),
}));

describe('getAllOrders', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all orders from dynamoDB', async () => {
    await getAllOrders(req, res);
    expect(dynamoDB.scan).toHaveBeenCalledWith({ TableName: 'orders' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(['order1', 'order2']);
  });

  it('should handle errors when retrieving orders from dynamoDB', async () => {
    const error = new Error('Internal server error');
    dynamoDB.scan.mockReturnValueOnce({ promise: jest.fn().mockRejectedValue(error) });
    await getAllOrders(req, res);
    expect(dynamoDB.scan).toHaveBeenCalledWith({ TableName: 'orders' });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});

describe('getOrder', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      params: {
        id: 'order1',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the order with the given id', async () => {
    await getOrder(req, res);
    expect(dynamoDB.get).toHaveBeenCalledWith({
      TableName: 'orders',
      Key: { id: 'order1' },
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: 'order1' });
  });

  it('should handle orders that are not found', async () => {
    dynamoDB.get.mockReturnValueOnce({ promise: jest.fn().mockResolvedValue({}) });
    await getOrder(req, res);
    expect(dynamoDB.get).toHaveBeenCalledWith({
      TableName: 'orders',
      Key: { id: 'order1' },
    });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Order not found' });
  });

  it('should handle errors when retrieving orders from dynamoDB', async () => {
    const error = new Error('Internal server error');
    dynamoDB.get.mockReturnValueOnce({ promise: jest.fn().mockRejectedValue(error) });
    await getOrder(req, res);
    expect(dynamoDB.get).toHaveBeenCalledWith({
      TableName: 'orders',
      Key: { id: 'order1' },
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internal server error' });
  });
});