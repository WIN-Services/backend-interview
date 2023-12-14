import request from 'supertest';
import { app } from '../app';

test('Handler getData', async () => {
    const response = await request(app.callback()).get('/getOrder');
    expect(response.status).toBe(200);
    expect(response.text).toBeDefined();
});

test('Handler postData', async () => {
    const response = await request(app.callback()).get('/createOrder');
    expect(response.status).toBe(201);
    expect(response.text).toBeDefined();
});
