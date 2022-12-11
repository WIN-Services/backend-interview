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

describe("GET /api/service", () => {
    it("should return all services", async () => {
        const res = await request(app).get("/api/service");
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    });
});

describe("GET /api/service/:id", () => {
    it("should return an service", async () => {
        const res = await request(app).get(
            "/api/service/6395fc481ee1cb43ce480989"
        );
        expect(res.statusCode).toBe(200);
        expect(res.body.data.name).toBe("raghav");
    });
});

describe("POST /api/service", () => {
    it("should create an service", async () => {
        const res = await request(app).post("/api/service").send({
            name: "abcd"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.data.name).toBe("abcd");
    });

});

describe("PUT /api/service/:id", () => {
    it("should update an service", async () => {
        const res = await request(app)
            .put("/api/service/6395f07f863b0c3c3253e1d9")
            .send({
                name: "testing2"
            });
        expect(res.statusCode).toBe(200);
    });
});

describe("DELETE /api/service/:id", () => {
    it("should delete an service", async () => {
        const res = await request(app).delete(
            "/api/service/6395d9bb616fe12ffae6b646"
        );
        expect(res.statusCode).toBe(200);
    });
});