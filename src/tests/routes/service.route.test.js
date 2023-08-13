const request = require('supertest');
const app = require('../../app');

describe('Service Routes', () => {
  let serviceId;

  it('should create a new service', async () => {
    const response = await request(app)
      .post('/api/service/')
      .send({
        name: 'Service Name'
      });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toHaveProperty('id');
    serviceId = response.body.data.id;
  });

  it('should get all services', async () => {
    const response = await request(app).get('/api/service/');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('should get a specific service by ID', async () => {
    const response = await request(app).get(`/api/service/${serviceId}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
    expect(response.body.data).toHaveProperty('id', serviceId);
  });

  it('should update a specific service by ID', async () => {
    const response = await request(app)
      .patch(`/api/service/${serviceId}`)
      .send({
        name: 'Updated Service Name'
      });

    expect(response.status).toBe(202);
    expect(response.body.status).toBe('success');
  });

  it('should delete a specific service by ID', async () => {
    const response = await request(app).delete(`/api/service/${serviceId}`);

    expect(response.status).toBe(204);
  });
});
