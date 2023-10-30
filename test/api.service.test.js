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
    describe("Create Service", function () {
        it('Send valid info . It should return 201', async function () {
            let res = await (chai.request(app)
                .post("/api/v1/service")
                .set('Accept', 'application/json'))
                .send({
                    "name": "Inspection",
                    "id": 1
                });
            chai.assert.equal(res.statusCode, 201)
            chai.assert.equal(res.body.message, "successfully added")
        })
        it('Send valid info . It should return 201', async function () {
            let res = await (chai.request(app)
                .post("/api/v1/service")
                .set('Accept', 'application/json'))
                .send({
                    "name": "Target",
                    "id": 2
                });
            chai.assert.equal(res.statusCode, 201)
            chai.assert.equal(res.body.message, "successfully added")
        })
        it('Send valid info . It should return 201', async function () {
            let res = await (chai.request(app)
                .post("/api/v1/service")
                .set('Accept', 'application/json'))
                .send({
                    "name": "Target3",
                    "id": 3
                });
            chai.assert.equal(res.statusCode, 201)
            chai.assert.equal(res.body.message, "successfully added")
        })
        it('Send valid info . It should return 201', async function () {
            let res = await (chai.request(app)
                .post("/api/v1/service")
                .set('Accept', 'application/json'))
                .send({
                    "name": "Target4",
                    "id": 4
                });
            chai.assert.equal(res.statusCode, 201)
            chai.assert.equal(res.body.message, "successfully added")
        })
        it('Send duplicate  service name . It should return 400 Error', async function () {
            let res = await (chai.request(app)
                .post("/api/v1/service")
                .set('Accept', 'application/json'))
                .send({
                    "name": "Inspection",
                    "id": 2
                });
            chai.assert.equal(res.statusCode, 400)
            chai.assert.equal(res.body.message, "service already exist")
        })
        it('Send duplicate  service id . It should return 400 Error', async function () {
            let res = await (chai.request(app)
                .post("/api/v1/service")
                .set('Accept', 'application/json'))
                .send({
                    "name": "Formal",
                    "id": 1
                });
            chai.assert.equal(res.statusCode, 400)
            chai.assert.equal(res.body.message, "service already exist")
        })
    })
    describe("Update Service", function () {
        it('Send duplicate service name . It should return 400', async function () {
            let res = await (chai.request(app)
                .patch("/api/v1/service/1")
                .set('Accept', 'application/json'))
                .send({
                    "name": "Target"
                });
            chai.assert.equal(res.statusCode, 400)
            chai.assert.equal(res.body.message, "service name already exist")
        })
        it('Send valid service name . It should return 200', async function () {
            let res = await (chai.request(app)
                .patch("/api/v1/service/1")
                .set('Accept', 'application/json'))
                .send({
                    "name": "NewData"
                });
            chai.assert.equal(res.statusCode, 200)
            chai.assert.equal(res.body.message, "successfully updated")
        })
    })
    describe("Fetch Services", async function () {
        it('Fetch 2 Services . it should return NewData, Target', async function () {
            let res = await (chai.request(app)
                .get("/api/v1/services?page=1&limit=2")
                .set('Accept', 'application/json'))
            chai.assert.equal(res.statusCode, 200)
            expect(res.body).to.be.an('array').with.lengthOf(2);
            res.body.forEach(element => {
                expect(element.name).to.contain.oneOf(['NewData', 'Target'])
            });
        })
        it('Fetch 2 Services and skip starting of 2 service. it should return Target3, Target4', async function () {
            let res = await (chai.request(app)
                .get("/api/v1/services?page=2&limit=2")
                .set('Accept', 'application/json'))
            chai.assert.equal(res.statusCode, 200)
            res.body.forEach(element => {
                expect(element.name).to.contain.oneOf(['Target4', 'Target3'])
            });
        })
    })
    describe("Fetch Service", async function () {
        it('Fetch invalid Services id  . it should return 400', async function () {
            let res = await (chai.request(app)
                .get("/api/v1/service/123")
                .set('Accept', 'application/json'))
            chai.assert.equal(res.statusCode, 404)
        })
        it('Fetch valid Services id  . it should return 200', async function () {
            let res = await (chai.request(app)
                .get("/api/v1/service/1")
                .set('Accept', 'application/json'))
            chai.assert.equal(res.statusCode, 200)
        })
    })
    describe("Delete Service", async function () {
        it('Send invalid Services id  . it should return 400', async function () {
            let res = await (chai.request(app)
                .delete("/api/v1/service/123")
                .set('Accept', 'application/json'))
            chai.assert.equal(res.statusCode, 404)
        })
        it('valid Services id  . it should return 200', async function () {
            let res = await (chai.request(app)
                .delete("/api/v1/service/1")
                .set('Accept', 'application/json'))
            chai.assert.equal(res.statusCode, 200)
        })
    })
})