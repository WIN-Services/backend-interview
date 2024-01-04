const request = require('supertest');
const app = require('../server');

import('chai').then(chai => {
    const expect = chai.expect;
    describe('Order Routes', () => {

        describe('GET /orders', () => {
            it('should return all orders', async () => {
                const res = await request(app).get('/orders');
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.any('array');
            });
        });

        describe('GET /orders/:id', () => {
            it('should return a single order', async () => {
                const res = await request(app).get('/orders/1');
                expect(res.statusCode).to.equal(200);
                expect(res.body).to.be.an('object');
            });
        });

        describe('POST /orders', () => {
            it('should create a new order', async () => {
                const newOrder = {
                    datetime: new Date(),
                    totalfee: 100,
                    services: [1, 2]
                };
                const res = await request(app)
                    .post('/orders')
                    .send(newOrder);
                expect(res.statusCode).to.equal(201);
            });
        });

        describe('PUT /orders/:id', () => {
            it('should update an existing order', async () => {
                const updateOrder = {
                    datetime: new Date(),
                    totalfee: 150
                };
                const res = await request(app)
                    .put('/orders/1')
                    .send(updateOrder);
                expect(res.statusCode).to.equal(200);
            });
        });

        describe('DELETE /orders/:id', () => {
            it('should delete an order', async () => {
                const res = await request(app).delete('/orders/2');
                expect(res.statusCode).to.equal(200);
            });
        });
    });
});
