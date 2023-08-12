const mongoose = require('mongoose');
const request = require('supertest');
const {expect} = require('expect');

const app = require('../server');

var orderId = '';

describe('GET /orders', () => {
    it('should return all orders', async () => {
        const res = await request(app).get('/orders?page=1&limit=20').send();

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

describe('POST /orders', () => {
    it ('should create a new order', async () => {
        const res = await request(app).post('/orders').send({
            services: ["64d742645fc79de6fff49f58", "64d742645fc79de6fff49f59"],
            totalFee: 170,
        });
        orderId = res.body._id;
        expect(res.statusCode).toBe(200);
    });
});

describe('POST /orders', () => {
    it ('should not create a new order, return 403 if an order already created within 3 hrs', async () => {
        const res = await request(app).post('/orders').send({
            services: ["64d742645fc79de6fff49f58", "64d742645fc79de6fff49f59"],
            totalFee: 170,
        });
        orderId = res.body._id;
        expect(res.statusCode).toBe(403);
    });
});

describe('GET /orders/:id', () => {
    it('should return a order', async () => {
        const res = await request(app).get(`/orders/${orderId}`).send();

        expect(res.statusCode).toBe(200);
    });
});

describe("PUT /orders/:id", () => {
    it("should update a orders", async () => {
      const res = await request(app).put(
        `/orders/${orderId}`
    ).send({
        services: ["64d742645fc79de6fff49f5a"]
    });
      expect(res.statusCode).toBe(200);
    });
});
