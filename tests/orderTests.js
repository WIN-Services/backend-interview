const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require("../app") 
const should = chai.should();

chai.use(chaiHttp);

describe('Orders GET APIs /orders/*  ', function () {
    it('1. GET /orders/ - It should get all the orders', function (done) {
        chai.request(app)
            .get("/orders")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('orders').that.is.an('array');
                done();
            })
    });

    it('2. GET /orders/:id - It should get order by id', function (done) {
        const orderId = 3; // Replace with the ID of the order you want to test
        chai.request(app)
            .get(`/orders/${orderId}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object').and.have.property('order');
                res.body.order.should.be.an('object');
                res.body.order.should.have.property("id")
                res.body.order.should.have.property("userDetails")
                res.body.order.should.have.property("services");
                done();
            });
    });

    it('3. GET /orders/:id - It should return a 404 status when order ID is not found', function (done) {
        const nonExistentOrderId = 999; // Replace with a non-existent order ID
        chai.request(app)
            .get(`/orders/${nonExistentOrderId}`)
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
      });
});


describe('Orders POST, PUT, DELETE APIs /orders/*  ', function () {
    let authToken
    this.beforeEach(async ()=> {
        const authResponse = await chai.request(app)
            .post('/users/login')
            .send({
                name: 'DJ',
                email: 'd@1.com',
                password: '12345'
            });

        authToken = authResponse.body.token;
    })

    let testOrderId;

    it('1. POST /orders/ - It should create a new order.', function (done) {
        chai.request(app)
            .post("/orders/")
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                services: [
                    789, 456
                ]
            })
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property("order");
                res.body.order.should.have.property("id");
                testOrderId = res.body.order.id;
                done();
            })
    });

    it('2. POST /orders/ - It should try to create a new order, but fail because of too frequent changes (3 hr limit)', function (done) {
        chai.request(app)
            .post("/orders/")
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                services: [
                    789, 456
                ]
            })
            .end((err, res) => {
                res.should.have.status(409);
                done();
            })
    });

    it('3. PUT update /orders/:id - It should try to update the existing order created in second test 1, but fail because of too frequent changes (3 hr limit)', function (done) {
        chai.request(app)
            .put(`/orders/${testOrderId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({
                services: [
                    789, 456
                ]
            })
            .end((err, res) => {
                res.should.have.status(409);
                done();
            })
    });

    it('4. Delete update /orders/:id - It should soft delete the order', function (done) {
        chai.request(app)
            .delete(`/orders/${testOrderId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });
});