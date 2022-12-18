import request from 'supertest';
import express from 'express';
import IntegrationHelpers from './helpers/IntegrationHelpers';

let server: express.Application;

beforeAll(async () => {
    server = await IntegrationHelpers.getApp();
});

describe('GET All /services', () => {
    it('should return 200 & valid response if request param list is empity', done => {
        request(server)
            .get(`/services`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)
                expect(res.body).toMatchObject({ count: 0, rows: [] })
                done()
            });
    });

    it('should return services if its there in db', async () => {

        await request(server)
            .post(`/services`)
            .send({
                "name": "Analysis"
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200);

        const response = await request(server)
            .get(`/services`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.count).toBe(1)
    });
});

describe('POST /services', () => {
    it('should create new service', async () => {
        const response = await request(server)
            .post(`/services`)
            .send({
                "name": "Testing"
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200);

        expect(response.body.id).not.toBeUndefined();
    });
});

describe('GET /services/:id', () => {
    it('should return one service by id value', async () => {
        const id = 1;
        const response = await request(server)
            .get(`/services/${id}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body.id).toBe(id)
    });

    it('should fail if no service with given id value', async () => {
        const id = 0;
        const response = await request(server)
            .get(`/services/${id}`)
            .expect('Content-Type', /json/)
            .expect(404);

        expect(response.body.message).toBe(`no service found with given id: ${id}`);
    });
});


describe('PUT /services/:id', () => {
    it('should return one service by id value', async () => {
        const createdData = await request(server)
            .post(`/services`)
            .send({
                "name": "Testing"
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200);

        const data = createdData.body;
        delete data.updatedAt;
        delete data.createdAt;
        data.name = "Inspection";

        const updatedData = await request(server)
            .put(`/services/${data.id}`)
            .send(data)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200);

        expect(updatedData.body.name).toBe(data.name);
        expect(updatedData.body.id).toBe(data.id);
    });
});


describe('DELETE /services/:id', () => {
    it('should delete one service by id value', async () => {
        const createdData = await request(server)
            .post(`/services`)
            .send({
                "name": "Maintenance"
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200);

        await request(server)
            .delete(`/services/${createdData.body.id}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200);

        const response = await request(server)
            .get(`/services/${createdData.body.id}`)
            .expect('Content-Type', /json/)
            .expect(404);

        expect(response.body.message).toBe(`no service found with given id: ${createdData.body.id}`);

    });
});