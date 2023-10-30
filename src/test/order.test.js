import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../server.js';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Order API', () => {
    it('should return a list of orders on GET /api/order', (done) => {
        chai
            .request(app)
            .get('/api/order')
            .end((err, res) => {
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should create an order on POST /api/order', (done) => {
        const orderData = {
            id: '123',
            datetime: '2022-11-01T11:11:11.111Z',
            totalfee: 100,
            services: [
                {
                    id: '123',
                }
            ]
        };

        chai
            .request(app)
            .post('/api/order')
            .send(orderData)
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                done();
            });
    });
});
