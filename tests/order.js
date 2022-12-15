const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");

require("dotenv").config();

// Connecting to the database before each test.
beforeEach(async () => {
    await mongoose.connect("mongodb://localhost:27017/win");
});

// Closing database connection after each test. 
afterEach(async () => {
    await mongoose.connection.close();
});

//Use updated order and service IDs while running the tests
describe("Order controller test cases ", () => {
    it("get all orders", async () => {
        const res = await request(app).get("/api/order");
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("get an order", async () => {
        const res = await request(app).get(
            "/api/order/6399c223ea30a93715b80730"
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.data.totalfee).toBe(104);
    });

    it("should create an order", async () => {
        const res = await request(app).post("/api/order").send({
            totalfee: 1000,
            services: ["6399c19af04024c354bf2f55"],
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.data.totalfee).toBe(1000);
    });

    it("should update an order", async () => {
        const res = await request(app)
            .put("/api/order/6399c223ea30a93715b80730")
            .send({
                totalfee: 104,
                services: ["6399c19af04024c354bf2f55"]
            });
        expect(res.statusCode).toBe(200);
    });

    it("should delete an order", async () => {
        const res = await request(app).delete(
            "/api/order/6399c223ea30a93715b80730"
        );
        expect(res.statusCode).toBe(200);
    });
});