const { expect } = require('chai');
const supertest = require('supertest');
const app = require('./api/routes/orderRouter');

const request = supertest(app);

describe('CRUD API', () => {
    it('should create a new record', async () => {
        const res = await request
            .post('/orders')
            .send({ name: 'Analysing' });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.equal('Analysing');
    });

    it('should retrieve records', async () => {
        const res = await request.get('/order/:id');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.eq(1);
    });

    it('should update a record', async () => {
        const recordsRes = await request.get('/order');
        const recordId = recordsRes.body[0].id;

        const res = await request
            .put(`/order/${recordId}`)
            .send({ name: 'Testing Analysing' });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.equal('Testing Analysing');
    });

    it('should delete a record', async () => {
        const recordsRes = await request.get('/orders');
        const recordId = recordsRes.body[0].id;

        const res = await request.delete(`/api/records/${recordId}`);

        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Record Successfully deleted');
    });
});