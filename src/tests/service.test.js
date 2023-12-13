const mongoose = require('mongoose');
const request = require('supertest');
const { app, server } = require('../../server');
const Service = require('../models/servicesModel');

describe('Service API', () => {
  afterAll(async () => {
    // Clean up: Delete the service/connections after all tests are done
    mongoose.connection.close();
    server.close();
  });
  
  it('should create a new service', async () => {
    const response = await request(app)
      .post('/services')
      .send({
        name: 'New Service',
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data._id).toBeDefined();
  });

  it('should get a specific service by ID', async () => {
    const service = new Service({
      name: 'Existing Service',
    });
    await service.save();

    const response = await request(app).get(`/services/${service._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data._id).toBe(service._id.toString());
  });

  it('should update an existing service by ID', async () => {
    const service = new Service({
      name: 'Old Service',
    });
    await service.save();

    const response = await request(app)
      .put(`/services/${service._id}`)
      .send({
        name: 'Updated Service',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.name).toBe('Updated Service');
  });

  it('should delete an existing service by ID', async () => {
    const service = new Service({
      name: 'Service to Delete',
    });
    await service.save();

    const response = await request(app).delete(`/services/${service._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data._id).toBe(service._id.toString());
  });

  it('should get all services', async () => {
    const response = await request(app).get('/services');

    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
