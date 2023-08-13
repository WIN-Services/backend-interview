const request = require('supertest');
const app = require('../../app');


describe('Order Routes', () => {
  let orderId;

  it('should create a new order', async () => {
    const response = await request(app)
      .post('/api/order/')
      .send({
        date_time: '2022-11-01T11:11:11.111Z',
        total_fee: 100,
        service_ids: [1, 2, 3]
      });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toHaveProperty('id');
    orderId = response.body.data.id;
  });

  it('should get all orders', async () => {
    const response = await request(app).get('/api/order/');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('should get a specific order by ID', async () => {
    const response = await request(app).get(`/api/order/${orderId}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toHaveProperty('id', orderId);
  });

  it('should update a specific order by ID', async () => {
    const response = await request(app)
      .patch(`/api/order/${orderId}`)
      .send({
        date_time: '2022-12-01T12:12:12.112Z'
      });

    expect(response.status).toBe(202);
    expect(response.body.status).toBe('success');
  });

  it('should delete a specific order by ID', async () => {
    const response = await request(app).delete(`/api/order/${orderId}`);

    expect(response.status).toBe(204);
  });
});


