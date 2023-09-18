process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../../server');

const { expect } = chai;

chai.use(chaiHttp);

describe('Orders Operations', () => {
  let orderId;

  it('should create an order', async () => {
    const res = await chai
      .request(server)
      .post('/api/v1/order/create-order')
      .send({
        service_ids: ['650846e7754730a1ca2b18fe'],
      });

    if (res?.body?.status_code === 200) {
      expect(res.body.data.orders).to.be.an('array');
      orderId = res?.body?.data?._id;
    } else if (res?.body?.status_code === 404) {
      expect(res.body.data.errors).to.be.an('array');
    }
  });

  it('should get all orders available from database', async () => {
    const res = await chai.request(server).get('/api/v1/order/get-all-orders');

    expect(res).to.have.status(200);
    expect(res?.body?.data?.orders).to.be.an('array');
  });
});
