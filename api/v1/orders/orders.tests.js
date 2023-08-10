import dotenv from "dotenv"
import request from "supertest"
import { establishDBConnection, collectionNames, closeDBConnection } from "../../../configs/db.configs";
import { app } from "../../../server.js"

dotenv.config()

beforeEach(async () => {
    await establishDBConnection();
});

afterEach(async () => {
    await closeDBConnection();
});

describe("POST /createOrder", () => {
    it("should create an order", async () => {
        let res = await request(app).post("/api/v1/services/createService").send(
            {
                "name": "Analysis",
                "fee": 100
            }
        );
        let { service_id } = res.body

        res = await request(app).post("/api/v1/users/createUser").send(
            {
                "name": "atma",
                "email": "atma@gmail.com",
                "dob": "02-08-2001"
            }
        );
        let { user_id } = res.body

        res = await request(app).post("/api/v1/orders/createOrder").send(
            {
                "user_id": user_id,
                "services": [
                    { "id": service_id }
                ]
            }
        );

        res = await request(app).post("/api/v1/orders/createOrder").send(
            {
                "user_id": user_id,
                "services": [
                    { "id": service_id }
                ]
            }
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /updateOrder", () => {
    it("should get update an order", async () => {
      const res = await request(app).put("/api/v1/orders/updateOrder/1/1").send(
            {
                "services": [
                    { "id": 1}
                ]
            }
        );
      expect(res.statusCode).toBe(400);
    });
});

describe("GET /deleteOrder", () => {
    it("should get delete an order", async () => {
      const res = await request(app).delete("/api/v1/orders/deleteOrder/1/1");
      expect(res.statusCode).toBe(200);
    });
});