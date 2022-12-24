const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../server");



/* Connecting to the database before each test. */
beforeAll(async () => {
    await mongoose.connect(process.env.DB_link);
});

afterAll(async () => {
    await mongoose.connection.close();
    await app.close();
})

describe("GET /service/all", () => {
    test("should return all services", async () => {
        const res = await request(app).get("/service/all");
        expect(res.statusCode).toEqual(200);
        expect(res.body.services).toBeTruthy();
        expect(Array.isArray(res.body.services));
    });
});