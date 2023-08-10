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

describe("POST /createService", () => {
    it("should create an service", async () => {
      const res = await request(app).post("/api/v1/services/createService").send(
        {
            "name": "Testing",
            "fee": 100
        }
      );
      expect(res.statusCode).toBe(200);
    });
});

describe("GET /getServices", () => {
    it("should get services with pagination", async () => {
      const res = await request(app).get("/api/v1/services/getServices?limit=10&offset=0");
      expect(res.statusCode).toBe(200);
    });
});