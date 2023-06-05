const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const request = require('supertest');


chai.use(chaiHttp);
const expect = chai.expect;

describe('Order Routes', () => {
  it('should create a new order', (done) => {
    const order = {
      totalfee: 100,
      service_id: '123456',
    };

    request(app)
      .post('/api/order/create')
      .send(order)
      .end((err, res) => {
        expect(res.statusCode).to.equal(500);
        expect(res.body).to.have.property('status').to.equal('failed');
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should return an error when totalfee is missing', (done) => {
    const order = {
      service_id: '123456',
    };

    request(app)
      .post('/api/order/create')
      .send(order)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('status').to.equal('validation_failed');
        expect(res.body).to.have.property('message').to.equal('Order total fee cannot be empty.');
        done();
      });
  });

  it('should return an error when service_id is missing', (done) => {
    const order = {
      totalfee: 100,
    };

    request(app)
      .post('/api/order/create')
      .send(order)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('status').to.equal('validation_failed');
        expect(res.body).to.have.property('message').to.equal('Service Id cannot be empty.');
        done();
      });
  });
});