//During the test the env variable is set to test
process.env.NODE_ENV = 'test';


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./../dist/index');

const express = require('express');

const app = express();
describe('POST Create User Wallet', () => {
    it('should create wallet for the user', () => {
        // code for testing the api
});
});

chai.use(chaiHttp);
describe('orders', () => {

/*
  * Test the /GET route
  */
  describe('/GET order', () => {
      it('it should GET all the orders', (done) => {
        chai.request(server)
            .get('/api/order/')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});