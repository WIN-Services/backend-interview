const request = require('supertest');
const app = require('./../server');


describe('Orders API Tests', () => {
  beforeAll(async () => {
    jest.clearAllMocks();
  });
  let orderId;
  it('should get all orders', async () => {
    const res = await request(app).get('/orders'); 
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(Array.isArray(res.body.result)).toBe(true);
  });

  it('should add a new order', async () => {
    const res = await request(app)
      .post('/orders') 
      .send({
        totalFees: 100.0,
        servicesUsed: [{ id: 1 }, { id: 2 }],
      });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    console.log(res.body);
    orderId = res.body.result.id
  });

  it('should update an order', async () => {
    const res = await request(app)
      .put(`/orders/${orderId}`) 
      .send({
        newtotalFees: 150.0,
        newservicesUsed: [{ id: 3 }],
      });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
  });

  it('should delete an order', async () => {
    const res = await request(app)
      .delete(`/orders/${orderId}`) 
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
  });
});

describe('Orders Library Failure Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle adding an order with a non-existent service ID', async () => {
    const response = await request(app)
      .post('/api/orders')
      .send({
        totalFees: 100.0,
        servicesUsed: [{ id: 1 }, { id: 2 }, { id: 999 }] // 999 is a non-existent service ID
      });

    expect(response.status).toBe(400); // Expect a Bad Request status code
    expect(response.body.status).toBe('failure'); // Expect a failure status
    expect(response.body.message).toBe('Invalid service id'); // Expected error message
  });
});

