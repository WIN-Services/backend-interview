const request = require('supertest');
const app = require('../app');

describe('Order Management System API', () => {
  let orderId;

  it('should create a new order', async () => {
    const newOrder = {
      id: '226',
      datetime: '2022-11-02T11:11:11.111Z',
      totalfee: 200,
      services: [
        {
          id: '123',
          name: 'Inspection',
        },
      ],
    };

    const res = await request(app).post('/orders').send(newOrder);

    expect(res.statusCode).toEqual(201);
    expect(res.body.id).toBe(newOrder.id);
    orderId = newOrder.id;
  });

  it('should not create an order with a duplicate ID', async () => {
    const duplicateOrder = {
      id: '226',
      datetime: '2022-11-03T11:11:11.111Z',
      totalfee: 300,
      services: [
        {
          id: '456',
          name: 'Analysis',
        },
      ],
    };

    const res = await request(app).post('/orders').send(duplicateOrder);

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toBe('Order ID must be unique');
  });

  it('should update an existing order', async () => {
    const updatedOrder = {
      datetime: '2022-11-04T11:11:11.111Z',
      totalfee: 400,
      services: [
        {
          id: '789',
          name: 'Testing',
        },
      ],
    };

    const res = await request(app).put(`/orders/${orderId}`).send(updatedOrder);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Order updated successfully');
  });

  it('should delete an existing order', async () => {
    const res = await request(app).delete(`/orders/${orderId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('Order deleted successfully');
  });

  it('should retrieve all orders', async () => {
    const res = await request(app).get('/orders');

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveLength(0);
    expect(res.body.currentPage).toBe(1);
    expect(res.body.totalPages).toBe(0);
    expect(res.body.totalOrders).toBe(0);
  });
});
