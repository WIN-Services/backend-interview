import request from 'supertest';
import app from '../server.js';

describe('GET /getallorders', () => {
  it('should get all orders', async () => {
    const response = await request(app).get('/getallorders');

    // Check the response status code
    expect(response.status).toBe(200);
  });
});