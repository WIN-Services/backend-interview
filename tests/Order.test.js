const request = require('supertest');
const app = require('../server'); // assuming the above code is part of an Express app

describe('Order API', () => {
  let orderId = 1;

  test('should create a new order', async () => {
    const res = await request(app)
      .post('/order/create')
      .send({ datetime: '2022-03-10T08:30:00.000Z', totalfee: 10, services: ['Service A', 'Service B'] });
    console.log(res)
    expect(res.statusCode).toEqual(201);
    expect(res.body.totalfee).toEqual(10);
  });

  test('should delete an order', async () => {
    const res = await request(app)
      .delete(`/order/delete/${orderId}`);
    expect(res.statusCode).toEqual(204);
  });
});