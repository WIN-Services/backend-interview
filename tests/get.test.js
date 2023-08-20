const test = require('ava');
const request = require('supertest');

const app = require('../server');

test('GET API endpoint should retrieve all data', async (t) => {
    const response = await request(app).get('/api/order'); // Replace with your actual GET endpoint
    t.is(response.status, 200);
    // Add more assertions based on your expected response
  });