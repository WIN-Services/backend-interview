const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const mongoose = require('mongoose');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Order API', function () {
    describe('POST /api/orders', function ()  {
        this.timeout(2000);
        
      it('should create a new order', function (done) { 
        
        chai
          .request(app)
          .post('/api/orders')
          .send({
            totalfee: 100,
            services: [
              { _id: new mongoose.Types.ObjectId()},
              { _id: new mongoose.Types.ObjectId()},
            ],
          })
          .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('message').that.equals('Order created successfully');
            done();
          });
      });
    });
  });
  
