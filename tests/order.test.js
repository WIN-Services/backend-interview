const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

describe("GET /api/order", () => {
    it("should return all orders", async () => {
        const res = await request(app).get("/api/order");
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    });
});

describe("GET /api/order/:id", () => {
    it("should return an order", async () => {
        const res = await request(app).get(
            "/api/order/6395f7b04fc00e40b0269a92"
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.data.totalfee).toBe(104);
    });
});

describe("POST /api/order", () => {
    it("should create an order", async () => {
        const res = await request(app).post("/api/order").send({
            totalfee: 1000,
            services: ["639612c62a8ec06e63e4783a"],
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.data.totalfee).toBe(1000);
    });
});

describe("POST /api/order", () => {
    //calling post api call again
    it("should not create an order", async () => {
        const failedRes = await request(app).post("/api/order").send({
            totalfee: 1000,
            services: ["639612c62a8ec06e63e4783a"],
        });
        expect(failedRes.statusCode).toBe(405);
    });
});


describe("PUT /api/order/:id", () => {
    it("should update an order", async () => {
        const res = await request(app)
            .put("/api/order/6395f7b04fc00e40b0269a92")
            .send({
                totalfee: 104,
                services: ["6395f07f863b0c3c3253e1d9"]
            });
        expect(res.statusCode).toBe(200);
    });
});

describe("DELETE /api/order/:id", () => {
    it("should delete an order", async () => {
        const res = await request(app).delete(
            "/api/order/6395fa3e42481c427bc73dba"
        );
        expect(res.statusCode).toBe(200);
    });
});