const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");

require("dotenv").config();

// Connecting to the database before each test
beforeEach(async () => {
    await mongoose.connect(process.env.DB_CONNECTION);
});

// Closing database connection after each test.
afterEach(async () => {
    await mongoose.connection.close();
});

//Use updated order and service IDs while running the tests
describe("Tests for Service Controller", () => {
    it("git branchget all services", async () => {
        const res = await request(app).get("/api/service");
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("get a service by id", async () => {
        const res = await request(app).get(
            "/api/service/6399c19af04024c354bf2f55"
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.data.name).toBe("harsh");
    });

    it("should create an service", async () => {
        const res = await request(app).post("/api/service").send({
            name: "Test1"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.data.name).toBe("Test1");
    });

    it("should update an service", async () => {
        const res = await request(app)
            .put("/api/service/6399c19af04024c354bf2f55")
            .send({
                name: "Test2"
            });
        expect(res.statusCode).toBe(200);
    });

    it("should delete an service", async () => {
        const res = await request(app).delete(
            "/api/service/6399c19af04024c354bf2f55"
        );
        expect(res.statusCode).toBe(200);
    });
});