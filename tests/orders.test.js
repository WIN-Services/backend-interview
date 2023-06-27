import mongoose from "mongoose";
const { connect, connection } = mongoose;
import request from "supertest";
import app from "../app";
import 'dotenv/config';

/* Connecting to the database before each test. */
beforeEach(async () => {
    connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, dbName: process.env.DB_NAME });
});
/* Closing database connection after each test. */
afterEach(async () => {
    await connection.close();
});

describe("GET api/order", () => {
    it("should return a order", async () => {
        const res = await request(app).get(
            "/api/order?orderId=649975a7f01f346887ae3206"
        );
        expect(res.statusCode).toBe(200);
        expect(res._body.data._id).toBe("649975a7f01f346887ae3206");
    });
});

describe("POST /api/order", () => {
    it("should create a order", async () => {
        const res = await request(app).post("/api/order").send(
            {
                "totalFee": 211,
                "serviceIds": [{ "id": "649970053ff37d61f1c5c0aa" }, { "id": "649970053ff37d61f1c5c0ac" }],
                "userId": 1
            }
        );
        expect(res.statusCode).toBe(200);
        expect(res._body.data).toBe("Order created successfully");
    });
});

describe("PUT /api/order/:id", () => {
    it("should update a order", async () => {
        const res = await request(app)
            .put("/api/order/649975a7f01f346887ae3206")
            .send({
                "amount": 10,
                "serviceIds": [{ "id": "649970053ff37d61f1c5c0aa" }],
            });
        expect(res.statusCode).toBe(200);
        expect(res._body.data).toBe("Order updated successfully");
    });
});

describe("DELETE /api/order/:id", () => {
    it("should delete a order", async () => {
        const res = await request(app).delete(
            "/api/order/649975a7f01f346887ae3206"
        );
        expect(res.statusCode).toBe(200);
    });
});
