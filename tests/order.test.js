const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Order = require('../src/models/order.model');
const Service = require('../src/models/service.model');

describe('Order Controller', () => {
  // Clean up database before each test
  beforeEach(async () => {
    await Order.deleteMany({});
    await Service.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('GET /orders', (done) => {
    it('should get all orders', async () => {
      // Add test data to the database
      await Order.create({ totalfee: 50, services: ['Service1'] });
      await Order.create({ totalfee: 75, services: ['Service2', 'Service3'] });

      const response = await request(app).get('/orders');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      end(done);
    });
  });

  describe('GET /order/:id', () => {
    it('should get an order by ID', async () => {
      const order = await Order.create({ totalfee: 50, services: ['Service1'] });

      const response = await request(app).get(`/order/${order._id}`);
      expect(response.status).toBe(200);
      expect(response.body.totalfee).toBe(50);
    });

    it('should return 404 if order ID not found', async () => {
      const response = await request(app).get('/order/nonexistentId');
      expect(response.status).toBe(404);
    });
  });

  describe('POST /order', () => {
    it('should create a new order', async () => {
      // Add test data to the database
      await Service.create({ name: 'Service1', fee: 25 });
      await Service.create({ name: 'Service2', fee: 30 });

      const newOrderData = {
        services: ['Service1', 'Service2'],
      };

      const response = await request(app).post('/order').send(newOrderData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('order');
      expect(response.body.order.totalfee).toBe(55);
    });

    it('should return 400 if creating an order within 3 hours of the last order update', async () => {
        // Add a recent order to simulate a recent update
        const recentOrder = await Order.create({ totalfee: 60, services: ['Service1', 'Service2'] });
    
        const newOrderData = {
          services: ['Service1', 'Service2'],
        };
    
        const response = await request(app)
          .post('/orders')
          .send(newOrderData);
    
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Cannot create an order within 3 hours of the last order update' });
      });
    
      it('should return 400 if a service is not available during creation', async () => {
        const newOrderData = {
          services: ['NonExistentService', 'Service2'],
        };
    
        const response = await request(app)
          .post('/orders')
          .send(newOrderData);
    
        expect(response.status).toBe(400);
        expect(response.text).toContain('NonExistentService service not available!');
      });
  });

  describe('PUT /order/:id', () => {
    it('should return 400 if updating an order within 3 hours of the last order update', async () => {
        // Add a recent order to simulate a recent update
        const recentOrder = await Order.create({ totalfee: 60, services: ['Service1', 'Service2'] });
    
        const updatedOrderData = {
          services: ['Service1', 'Service2'],
        };
    
        const response = await request(app)
          .put(`/orders/${recentOrder._id}`)
          .send(updatedOrderData);
    
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Cannot update an order within 3 hours of the last order update' });
      });
    
      it('should return 400 if a service is not available during update', async () => {
        const updatedOrderData = {
          services: ['NonExistentService', 'Service2'],
        };
    
        const response = await request(app)
          .put('/orders/existingOrder')
          .send(updatedOrderData);
    
        expect(response.status).toBe(400);
        expect(response.text).toContain('NonExistentService service not available!');
      });
    
      it('should return 404 if the order ID is not found during update', async () => {
        const updatedOrderData = {
          services: ['Service1', 'Service2'],
        };
    
        const response = await request(app)
          .put('/orders/nonexistentOrder')
          .send(updatedOrderData);
    
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Order nonexistentOrder not found!' });
      });
  });

  describe('DELETE /order/:id', () => {
    it('should delete an order by ID', async () => {
      const order = await Order.create({ totalfee: 50, services: ['Service1'] });

      const response = await request(app).delete(`/order/${order._id}`);
      expect(response.status).toBe(200);
    });

    it('should return 404 if order ID not found', async () => {
      const response = await request(app).delete('/order/nonexistentId');
      expect(response.status).toBe(404);
    });
  });
});
