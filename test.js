const request = require('supertest');
const app = require('./server.js');

describe('Order Management API', () => {
    const orderId = '226';

    // Test POST /orders
    it('should create a new order', async () => {
        const newOrder = {
          id: orderId,
          datetime: '2022-12-01T12:12:12.121Z',
          totalfee: 200,
          services: [{ id: '123' }],
        };
    
        const response = await request(app).post('/orders').send(newOrder);
        expect(response.status).toBe(201);
        expect(response.body.id).toBe(newOrder.id);
      });
  
    // Test GET /orders/:id
    it('should retrieve a specific order', async () => {
      const response = await request(app).get(`/orders/${orderId}`);
      expect(response.status).toBe(200);
      expect(response.body.id).toBe(orderId);
    });

  
    // Test DELETE /orders/:id
    it('should delete an existing order', async () => {
  
      const response = await request(app).delete(`/orders/${orderId}`);
      expect(response.status).toBe(204);
    });
  });
  