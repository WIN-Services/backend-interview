let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../server')
let should = chai.should();
let expect = chai.expect
chai.use(chaiHttp)

describe('Retrieving orders',()=>{
    //get test
   
    describe('retrieve all orders ', () => {
        it('should return 200 and array', async () => {
            const res = await chai.request('http://localhost:5000/api/v1').get('/orders', {});
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array')
        });
    })

    describe('retrieve single record', () => {
        it('should return 200 and array containing same id', async () => {
            var id = 223
            const res = await chai.request('http://localhost:5000/api/v1').get('/orders/id', {});
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array')
        });
    })


})

describe('Delete order',()=>{
    //get test
    describe('delete order that exists ', () => {
        var id = 224
        it('should return 202 ', async () => {
            const res = await chai.request('http://localhost:5000/api/v1').delete(`/orders/${id}`, {});
            expect(res.status).to.equal(202);
        });
    })

    describe('delete order that does not exists ', () => {
        var id = 23233
        it('should return 400 ', async () => {
            const res = await chai.request('http://localhost:5000/api/v1').delete(`/orders/${id}`, {});
            expect(res.status).to.equal(400);
        });
    })

})

describe('Create order',()=>{
    //get test
    describe('create new order', () => {
        it('should return 202 ', async () => {
            var body = {
                 "id":227,
                 "dateTime":"2022-12-22T06:02:52.872Z",
                 "totalfee":900,
                 "services": [{"id":456}]
            }
            const res = await chai.request('http://localhost:5000/api/v1').post(`/orders`, {}).send(body);
            expect(res.status).to.equal(200);
        });
    })

    describe('create new order with wrong date input', () => {
        it('should return 406 ', async () => {
            var body = {
                 "id":228,
                 "dateTime":"gdsfgfdggddg",
                 "totalfee":900,
                 "services": [{"id":456}]
            }
            const res = await chai.request('http://localhost:5000/api/v1').post(`/orders`, {}).send(body);
            expect(res.status).to.equal(406);
        });
    })

    describe('create new order within 3 hours', () => {
        it('should return 503 ', async () => {
            var body = {
                 "id":227,
                 "dateTime":"2022-12-22T06:02:52.872Z",
                 "totalfee":900,
                 "services": [{"id":456}]
            }
            const res = await chai.request('http://localhost:5000/api/v1').post(`/orders`, {}).send(body);
            expect(res.status).to.equal(503);
        });
    })

})


describe('Update order',()=>{
    //get test
    describe('Update existing order', () => {
        it('should return 200 ', async () => {
            var body = {
                 "id":227,
                 "dateTime":"2022-12-22T06:02:52.872Z",
                 "totalfee":9000,
                 "services": [{"id":123}]
            }
            const res = await chai.request('http://localhost:5000/api/v1').put(`/orders`, {}).send(body);
            expect(res.status).to.equal(200);
        });
    })

    describe('Update non existing order', () => {
        it('should return 400 ', async () => {
            var body = {
                 "id":22666,
                 "dateTime":"2022-12-22T06:02:52.872Z",
                 "totalfee":9000,
                 "services": [{"id":123}]
            }
            const res = await chai.request('http://localhost:5000/api/v1').put(`/orders`, {}).send(body);
            expect(res.status).to.equal(400);
        });
    })

})