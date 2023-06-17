import { init } from '../src/server';
import { Express } from "express";
import request from 'supertest';

describe("GET /orders/:orderId", () => {
    let app: Express;
    beforeEach(async () => {
        app = await init();
    });

    it("should return a specific order", async () => {
        const order = {
            "totalfee": 30,
            "services": [123, 789]
        };
        const orderCreated = await request(app).post("/orders").send(order);
        const res = await request(app).get(`/orders/${orderCreated.body.data.id}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.data.totalfee).toEqual(order.totalfee);
        
        expect(res.body.data.services).toEqual(order.services);
    });

    it("should return an error invalid orderId", async () => {
        const res = await request(app).get("/orders/6489e65ac098c502909777b5");
        expect(res.statusCode).toEqual(422);
        expect(res.body.message).toEqual("Invalid orderId");
    });
});