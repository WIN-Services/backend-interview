import dotenv from 'dotenv';

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/server');
import dotnev from 'dotenv';
// require('dotenv').config();/

console.log('here');

/* Connecting to the database before each test. */
const beforeEach = async () => {
  await mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost:27017/win-backend-interview'
  );
};

/* Closing database connection after each test. */
const afterEach = async () => {
  await mongoose.connection.close();
};

// writing tests for the order service
describe('GET /api/orders', () => {
  if (
    ('should return all orders',
    async () => {
      const res = await request(app).get('/api/orders');
      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThan(0);
    })
  );
});

// const orderId = '';

describe('POST /api/orders', () => {
  if (
    ('should return a single order',
    async () => {
      const res = await request(app).post('/api/orders/');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('totalfee');
    })
  );

  test('should return a single order', async () => {
    const res = await request(app).post('/api/orders/').send({
      name: 'datetime',
      totalfee: '100',
      services: [],
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('totalfee');
  });
});

describe('GET /api/orders/:id', () => {
  if (
    ('should return a single order',
    async () => {
      const res = await request(app).get('/api/orders/:id');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('totalfee');
    })
  );
});

describe('PUT /api/orders/:id', () => {
  if (
    ('should return a single order',
    async () => {
      const res = await request(app).put('/api/orders/:id');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('totalfee');
    })
  );
});

describe('DELETE /api/orders/:id', () => {
  if (
    ('should return a single order',
    async () => {
      const res = await request(app).delete('/api/orders/:id');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('totalfee');
    })
  );
});
