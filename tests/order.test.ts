import request from 'supertest';
import {app} from '../server';
import { HttpStatus } from '../src/utils/enums';

describe('OrderController', () => {
  let createdOrderId: number;

  describe('POST /api/orders/create', () => {
    it('should create a new order', async () => {
      const response = await request(app)
        .post('/api/orders/create')
        .send({ totalFee: 100 });

      expect(response.status).toBe(HttpStatus.CREATED);
      expect(response.body.message).toBe('success');
      expect(response.body.status).toBe('created');
      expect(response.body.data.totalFee).toBe(100);

      // Save the created order ID for other test cases
      createdOrderId = response.body.data.id;
    });

    it('should return an error if totalFee is missing', async () => {
      const response = await request(app)
        .post('/api/orders/create')
        .send({});

      expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(response.body.message).toBe('failure');
      expect(response.body.status).toBe('not created');
      expect(response.body.data.error).toBeTruthy();
    });
  });

  describe('GET /api/orders/:id', () => {
    it('should get an order by ID', async () => {
      const response = await request(app).get(`/api/orders/${createdOrderId}`);

      expect(response.status).toBe(HttpStatus.SUCCESS);
      expect(response.body.message).toBe('success');
      expect(response.body.status).toBe('ok');
      expect(response.body.data.id).toBe(createdOrderId);
    });

    it('should return an error if order ID is invalid', async () => {
      const response = await request(app).get(`/api/orders/invalid-id`);

      expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(response.body.message).toBe('failure');
      expect(response.body.status).toBe('not ok');
      expect(response.body.data.error).toBeTruthy();
    });
  });

  describe('DELETE /api/orders/delete/:id', () => {
    it('should delete an order by ID', async () => {
      const response = await request(app).delete(`/api/orders/delete/${createdOrderId}`);

      expect(response.status).toBe(HttpStatus.SUCCESS);
      expect(response.body.message).toBe('success');
      expect(response.body.status).toBe('deleted');
      expect(response.body.data.id).toBe(createdOrderId);
    });

    it('should return an error if order ID is invalid', async () => {
      const response = await request(app).delete(`/api/orders/delete/invalid-id`);

      expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(response.body.message).toBe('success');
      expect(response.body.status).toBe('not deleted');
      expect(response.body.data.error).toBeTruthy();
    });
  });
});
