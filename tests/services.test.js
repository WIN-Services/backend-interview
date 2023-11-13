const request = require('supertest');
const mongoose = require('mongoose');
const app = require("../server");

const Order = require('../models/orders');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.disconnect();
});

beforeEach(async () => {

    await Order.deleteMany();
});

describe('Orders Routes Tests', () => {
    it('should create a new order', async () => {
        const response = await request(app)
            .post('/api/v1/orders')
            .send({
                id: '8',
                datetime: '2022-11-01T11:11:11.111Z',
                totalfee: 100,
                services: [{ id: '456' }],
            });

        expect(response.status).toBe(201);
    });


});
