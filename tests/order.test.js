const mongoose = require('mongoose');
const request = require('supertest');
const Services = require('../models/serviceModel');
const messages = require('../helpers/messages');

const {app, server} = require('../server');

describe('Order API', () => {
    let serviceId, orderId;
    beforeAll(async () => {

    const service = new Services({ name: 'Test Services' });
    await service.save();
    serviceId = service._id;
    });

    afterAll(async () => {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
      server.close();
    });

  it('should create a new order', async () => {
    const response = await request(app)
      .post('/order')
      .send({
        datetime: '2023-02-23T01:01:01.001Z',
        totalfee: 250,
        services: [serviceId],
      });
    orderId = response.body.data._id;

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(messages.ORDER_CREATED);
  });
  
  it('should throw error while creating order for pre-existing order within 3 hours', async () => {
    const response = await request(app)
    .post('/order')
    .send({
      datetime: '2023-02-23T01:01:01.001Z',
      totalfee: 100,
      services: [serviceId],
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.message).toBe(messages.ORDER_EXIST_INTERVAL);
    
  });
  
  it('should get a specific order by ID', async () => {  
    const response = await request(app).get(`/order/${orderId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data._id).toBe(orderId.toString());
    expect(response.body.message).toBe(messages.GET_ORDER);
  });

  it('should get all orders', async () => {
    const response = await request(app).get('/order');

    expect(response.statusCode).toBe(200);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.message).toBe(messages.GET_ALL_ORDERS);
  });

  it('should update an existing order by orderID within 3 hrs', async () => {
    const response = await request(app)
      .put(`/order/${orderId}`)
      .send({
        datetime: '2023-02-21T01:01:01.001Z',
        totalfee: 450
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.totalfee).toBe(450);
    expect(response.body.message).toBe(messages.ORDER_UPDATED);
  });

  it('should delete an existing order by OrderId', async () => {
    const response = await request(app).delete(`/order/${orderId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.data._id).toBe(orderId.toString());
    expect(response.body.message).toBe(messages.ORDER_DELETED);
  });
  
});