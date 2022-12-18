import request from 'supertest';
import express from 'express';
import IntegrationHelpers from './helpers/IntegrationHelpers';

let server: express.Application;
let service1Data: any;
let service2Data: any;

beforeAll(async () => {
    server = await IntegrationHelpers.getApp();
    const response1 = await request(server)
        .post(`/services`)
        .send({
            "name": "Analysis"
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200);
    service1Data = response1.body;

    const response2 = await request(server)
        .post(`/services`)
        .send({
            "name": "Inspection"
        })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(200);
    service2Data = response2.body;
});

describe('GET All /orders', () => {
    it('should return 200 & valid response if request param list is empity', done => {
        request(server)
            .get(`/orders`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({ count: 0, rows: [] })
                done()
            });
    });

    it('should return orders if its there in db', async () => {
        const orderData = await request(server)
            .post(`/orders`)
            .send({
                userId: 1,
                totalFee: 100,
                serviceId: service1Data.id
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200);
        expect(orderData.body.id).not.toBeUndefined();

        const response = await request(server)
            .get(`/orders`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body.count).toBe(1)
    });
});

describe('POST /orders', () => {
    it('should create new order', async () => {
        const orderData = await request(server)
            .post(`/orders`)
            .send({
                userId: 1,
                totalFee: 100,
                serviceId: service2Data.id
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200);
        expect(orderData.body.id).not.toBeUndefined();

        const response = await request(server)
            .get(`/services`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.count).toBeGreaterThan(0);
    });

    it('should not allow creation of dublicate order until 3 hours', async () => {
        const response = await request(server)
            .post(`/orders`)
            .send({
                userId: 1,
                totalFee: 100,
                serviceId: service2Data.id
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(400);

        expect(response.body.message).toBe('order with given service id already exits');
    });
});

describe('GET /orders/:id', () => {
    it('should return one order by id value', async () => {
        const id = 1;
        const response = await request(server)
            .get(`/orders/${id}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.id).toBe(id)
    });

    it('should fail if no order with given id value', async () => {
        const id = 0;
        const response = await request(server)
            .get(`/orders/${id}`)
            .expect('Content-Type', /json/)
            .expect(404);

        expect(response.body.message).toBe(`no order found with given id: ${id}`);
    });
});


describe('PUT /orders/:id', () => {
    it('should allow update for old service order request', async () => {
        const id = 1;
        const response = await request(server)
            .put(`/orders/${id}`)
            .send({
                userId: 1,
                totalFee: 200,
                serviceId: service1Data.id
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200);

        expect(+response.body.id).toBe(id);
        expect(response.body.totalFee).toBe(200);
    });

    it('should not allow update recent service order request until 3 hours from created time', async () => {
        const id = 2;
        const response = await request(server)
            .put(`/orders/${id}`)
            .send({
                userId: 1,
                totalFee: 100,
                serviceId: service2Data.id
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(400);

        expect(response.body.message).toBe('update not allowed until 3 hours');
    });
});


describe('DELETE /orders/:id', () => {
    it('should delete one order by id value', async () => {
        const id = 1;
        await request(server)
            .delete(`/orders/${id}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200);

        const response = await request(server)
            .get(`/orders/${id}`)
            .expect('Content-Type', /json/)
            .expect(404);

        expect(response.body.message).toBe(`no order found with given id: ${id}`);
    });

    it('should return 404 if no orders exists with given id value', async () => {
        await request(server)
            .delete(`/orders/0`)
            .expect(404);
    });
});