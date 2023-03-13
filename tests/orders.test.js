const request = require('supertest');
const app = require('../app');

describe('Order API', () => {
  let orderId = 12;
  let token = process.env.TOKEN;

  test('getting an order detail', async () => {
    const res = await request(app)
      .get(`/orders/order/${orderId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(typeof res.body.data).toBe(typeof [])
  });

  test('deleting an order', async () => {
    const res = await request(app)
      .delete(`/orders/order/${orderId}`)
      .set('Authorization', `Bearer ${token}`);;
    expect(res.statusCode).toEqual(200);
  });
});