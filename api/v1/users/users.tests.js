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

describe("POST /createUser", () => {
    it("should create an user", async () => {
      const res = await request(app).post("/api/v1/users/createUser").send(
        {
            "name": "roshan",
            "email": "roshan@gmail.com",
            "dob": "05-02-2001"
        }
      );
      expect(res.statusCode).toBe(200);
    });
});

