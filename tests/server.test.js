const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../server");
const DB_CONSTANTS = require("../constants/database");


/* Connecting to the database before each test. */
beforeAll(async () => {
    await mongoose.connect(DB_CONSTANTS.DATABASE_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
    await app.close();
})

describe("GET /api/service", () => {
    test("should return all services", async () => {
        const res = await request(app).get("/api/service");
        expect(res.statusCode).toEqual(200);
        expect(res.body.services).toBeTruthy();
        expect(Array.isArray(res.body.services));
    });
});