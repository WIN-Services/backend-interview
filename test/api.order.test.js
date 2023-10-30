const chai = require("chai"),
    chaiHttp = require("chai-http");

let expect = chai.expect;
const {connectDB , Service , Order} = require('../src/models')
chai.use(chaiHttp);

// application
const app = require("../server");

describe("API Testing", async function () {
    before(async function () {
        await connectDB()
        await Service.deleteMany({})
        await Order.deleteMany({})
    })
    describe("Create Order", function () {
        it('Send valid info . It should return 201', async function () {
            let res = await (chai.request(app)
                .post("/api/v1/order")
                .set('Accept', 'application/json'))
                .send({
                    "id" : 1,
                    "totalfee": 3.1,
                    "services": [
                        {
                            "id": 2
                        },
                        {
                            "id": 3
                        }
                    ]
                });
            chai.assert.equal(res.statusCode, 201)
            chai.assert.equal(res.body.message, "successfully ordered")
        })
        it('Send duplicate  order id . It should return 400 Error', async function () {
            let res = await (chai.request(app)
                .post("/api/v1/order")
                .set('Accept', 'application/json'))
                .send({
                    "id" : 1,
                    "totalfee": 3.1,
                    "services": [
                        {
                            "id": 2
                        },
                        {
                            "id": 3
                        }
                    ]
                });
            chai.assert.equal(res.statusCode, 400)
            chai.assert.equal(res.body.message, "order already exist")
        })
        it('Send valid info . It should return 201', async function () {
            let res = await (chai.request(app)
                .post("/api/v1/order")
                .set('Accept', 'application/json'))
                .send({
                    "id" : 2,
                    "totalfee": 300,
                    "services": [
                        {
                            "id": 4
                        }
                    ]
                });
            chai.assert.equal(res.statusCode, 201)
            chai.assert.equal(res.body.message, "successfully ordered")
        })
    })
    describe("Update Order", function () {
        it('Send valid order name . It should return 200', async function () {
            let res = await (chai.request(app)
                .patch("/api/v1/order/1")
                .set('Accept', 'application/json'))
                .send({
                    "totalfee": 310,
                    "services": [
                        {
                            "id": 2
                        }
                    ]
                });
            chai.assert.equal(res.statusCode, 200)
            chai.assert.equal(res.body.message, "successfully updated")
        })
    })
    describe("Fetch Orders", async function () {
        it('Fetch 2 Orders', async function () {
            let res = await (chai.request(app)
                .get("/api/v1/orders?page=1&limit=2")
                .set('Accept', 'application/json'))
            chai.assert.equal(res.statusCode, 200)
            expect(res.body).to.be.an('array').with.lengthOf(2);
        })
        it('Fetch 2 Orders and skip starting of 2 order', async function () {
            let res = await (chai.request(app)
                .get("/api/v1/orders?page=2&limit=2")
                .set('Accept', 'application/json'))
            chai.assert.equal(res.statusCode, 200)
        })
    })
    describe("Fetch Order", async function () {
        it('Fetch invalid Orders id  . it should return 400', async function () {
            let res = await (chai.request(app)
                .get("/api/v1/order/123")
                .set('Accept', 'application/json'))
            chai.assert.equal(res.statusCode, 404)
        })
        it('Fetch valid Orders id  . it should return 200', async function () {
            let res = await (chai.request(app)
                .get("/api/v1/order/1")
                .set('Accept', 'application/json'))
            chai.assert.equal(res.statusCode, 200)
        })
    })
    describe("Delete Order", async function () {
        it('Send invalid Orders id  . it should return 400', async function () {
            let res = await (chai.request(app)
                .delete("/api/v1/order/123")
                .set('Accept', 'application/json'))
            chai.assert.equal(res.statusCode, 404)
        })
        it('valid Orders id  . it should return 200', async function () {
            let res = await (chai.request(app)
                .delete("/api/v1/order/1")
                .set('Accept', 'application/json'))
            chai.assert.equal(res.statusCode, 200)
        })
    })
})