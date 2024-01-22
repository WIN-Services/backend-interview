const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const app = require('../server.js');

chai.use(chaiHttp);

describe('Server', () => {
  it('should respond with "Hello from server!" when accessing /hello', (done) => {
    chai
      .request(app)
      .get('/hello')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.equal('Hello from server!');
        done();
      });
  });
});