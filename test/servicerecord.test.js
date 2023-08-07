const { expect } = require('chai');
const supertest = require('supertest');
// const app = require('../app/routes');
const app = require('../server');

const request = supertest(app);

describe('Service record API', () => {
    it('should create a new record', async () => {
        const res = await request
            .post('/servicerecords')
            .send({ name: 'Analysing' });

        expect(res.status).to.equal(201);
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.equal('Analysing');
    });

    it('should retrieve records', async () => {
        const res = await request.get('/servicerecords/2');

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
    });

    it('should update a record', async () => {
        const recordsRes = await request.get('/servicerecords');
        const recordId = recordsRes.body[0].id;
        console.log(recordId)

        const res = await request
            .put(`/servicerecords/${recordId}`)
            .send({ name: 'Testing Analysing' });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('id');
        expect(res.body.name).to.equal('Testing Analysing');
    });

    it('should delete a record', async () => {
        const recordsRes = await request.get('/servicerecords');
        // console.log(recordsRes)
        const recordId = recordsRes.body[0].id;

        const res = await request.delete(`/servicerecords/${recordId}`);

        expect(res.status).to.equal(200);
        expect(res.body.msg).to.equal('DELETED');
    });
});