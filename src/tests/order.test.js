const mongoose = require('mongoose');
const request = require('supertest');
const { app, server } = require('../../server');
const Order = require('../models/orderModel');
const Services = require('../models/servicesModel');

describe('Order API', () => {
  let serviceId;

  beforeAll(async () => {
    // Create a sample service to be used in the order
    const service = new Services({ name: 'Test Services' });
    await service.save();
    serviceId = service._id;
  });

  afterAll(async () => {
    // Clean up: Delete the service/connections after all tests are done
    await Services.findByIdAndDelete(serviceId);
    mongoose.connection.close();
    server.close();
  });

  it('should create a new order', async () => {
    const response = await request(app)
      .post('/orders')
      .send({
        datetime: '2022-11-01T11:11:11.111Z',
        totalfee: 100,
        services: [serviceId],
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data._id).toBeDefined();
  });

  it('should throw error for pre-existing order within 3 hours', async () => {
    // check for 3 hours of pre-existing order
    const response = await request(app)
      .post('/orders')
      .send({
        datetime: '2022-11-01T11:11:11.111Z',
        totalfee: 100,
        services: [serviceId],
      });
    expect(response.statusCode).toBe(400);
  });

  it('should get a specific order by ID', async () => {
    const order = new Order({
      datetime: '2023-11-02T11:11:11.111Z',
      totalfee: 150,
      services: [serviceId],
    });
    await order.save();

    const response = await request(app).get(`/orders/${order._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data._id).toBe(order._id.toString());
  });

  it('should update an existing order by ID', async () => {
    const order = new Order({
      datetime: '2024-11-03T11:11:11.111Z',
      totalfee: 200,
      services: [serviceId],
    });
    await order.save();

    const response = await request(app)
      .put(`/orders/${order._id}`)
      .send({
        totalfee: 250
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.totalfee).toBe(250);
  });

  it('should delete an existing order by ID', async () => {
    const order = new Order({
      datetime: '2022-10-05T11:11:11.111Z',
      totalfee: 300,
      services: [serviceId],
    });
    await order.save();

    const response = await request(app).delete(`/orders/${order._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data._id).toBe(order._id.toString());
  });

  it('should get all orders', async () => {
    const response = await request(app).get('/orders');

    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
