const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server');
const { expect } = chai;
chai.use(chaiHttp);
let sampleData = {
    "totalfee": 500,
    "services": ["6569a96b1fdddf1e7e65a907", "6569a9438b41c7fa602c4609"]
}

describe('API Tests', () => {
    it('should return JSON data with status 200', (done) => {
        chai
            .request(app)
            .get('/api/order')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                done();
            });
    });

    // it('should create a new order and return status code 201', (done) => {
    //     chai.request(app)
    //         .post('/api/order')
    //         .send(sampleData)
    //         .end((err, res) => {
    //             // console.log("222222222",res.body)
    //             res.should.have.status(201);
    //             done();
    //         });
    // });
});