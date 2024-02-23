const mongoose = require('mongoose');
const request = require('supertest');
const messages = require('../helpers/messages');

const {app, server} = require('../server');

describe('Servie API', () => {
    let serviceId;

    afterAll(async () => {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      server.close();
    });

  it('should create a new service', async () => {
    const response = await request(app)
      .post('/service')
      .send({
        name: 'New Service Testing'
      });
    serviceId = response.body.data._id;
    
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(messages.SERVICE_ADDED);
  });
  
  it('should get a specific service by ID', async () => {  
    const response = await request(app).get(`/service/${serviceId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data._id).toBe(serviceId.toString());
    expect(response.body.message).toBe(messages.GET_SERVICE);
  });

  it('should get all services', async () => {
    const response = await request(app).get('/service');

    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.message).toBe(messages.GET_ALL_SERVICES);
  });

  it('should update an existing service by serviceId', async () => {
    const response = await request(app)
      .put(`/service/${serviceId}`)
      .send({
        name: "updated  test service"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe(messages.SERVICE_UPDATED);
  });

  it('should delete an existing service by ServiceId', async () => {
    const response = await request(app).delete(`/service/${serviceId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data._id).toBe(serviceId.toString());
    expect(response.body.message).toBe(messages.SERVICE_DELETED);
  });
  
});